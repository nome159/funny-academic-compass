/**
 * 学术罗盘 · 监控采集与汇总接口
 * Google Apps Script —— 部署为「Web 应用」，执行身份选「我」，访问权限选「任何人」。
 *
 * 它做两件事：
 *   doPost  接收页面埋点事件 / 准确性反馈，逐行写入 Google Sheet
 *   doGet   按需输出汇总 JSON（JSONP），供 monitor.html 渲染看板
 *
 * 一次性配置（见下方 CONFIG）：
 *   1. adminToken    改成你自己的口令。留空则汇总接口一律拒绝返回数据，防止链接被猜中后数据外泄。
 *   2. spreadsheetId 一般留空。从表格里进 Apps Script 时脚本自动绑定该表，无需填 ID。
 *   3. 部署后复制 /exec 网址，填到 index.html 与 monitor.html。
 *
 * 部署步骤见同目录 MONITORING-SETUP.md。
 */

var VERSION = "2.1.0";

var CONFIG = {
  // 【一般不用填】从 Google 表格里点「扩展程序 → Apps Script」创建的脚本会自动绑定该表格，
  // 留空即可 —— 脚本用 SpreadsheetApp.getActiveSpreadsheet() 直接拿表，不需要任何 ID，
  // 换表、改表名、表格被删重建都不会失效。
  // 只有「独立脚本」（没有绑定表格）才需要把表格 ID 填在这里。
  // 表格 ID = 表格网址里 /d/ 与 /edit 之间的那串字符。
  spreadsheetId: "",
  analyticsSheet: "academic_compass_events",
  feedbackSheet: "academic_compass_feedback",
  adminToken: "",
  tzOffsetMinutes: 480,
  maxRows: 50000,
  cacheSeconds: 120,
  idCacheSeconds: 21600,
  recentLimit: 30
};

/* ------------------------------------------------------------------ *
 * Sheet 列定义
 * 标签即表头。脚本按表头文字定位列，所以手动调整列顺序也不会写错位。
 * ------------------------------------------------------------------ */

var ANALYTICS_KEYS = [
  "eventName", "analyticsEvent", "eventId", "createdAt", "visitorId", "sessionId",
  "viewId", "buttonId", "buttonText", "targetView", "questionId", "questionIndex", "answerValue",
  "typeCode", "typeName", "pageUrl", "path", "referrer", "userAgent", "language", "viewport", "timezone", "extraJson"
];

var ANALYTICS_LABELS = [
  "事件名称", "事件类型", "事件ID", "时间", "访客ID", "会话ID",
  "页面", "按钮ID", "按钮文案", "目标页面", "题目ID", "题目序号", "答案值",
  "结果代码", "结果名称", "页面URL", "路径", "来源页面", "设备UA", "语言", "视口", "时区", "扩展JSON"
];

var FEEDBACK_KEYS = [
  "eventName", "feedbackId", "createdAt", "selfFit", "typeCode", "typeName",
  "confidenceLabel", "confidenceAverageMargin",
  "problemDimension", "problemDominant", "problemDominantName", "problemLeftPercent", "problemRightPercent",
  "methodDimension", "methodDominant", "methodDominantName", "methodLeftPercent", "methodRightPercent",
  "rhythmDimension", "rhythmDominant", "rhythmDominantName", "rhythmLeftPercent", "rhythmRightPercent",
  "expressionDimension", "expressionDominant", "expressionDominantName", "expressionLeftPercent", "expressionRightPercent",
  "Q01", "Q02", "Q03", "Q04", "Q05", "Q06", "Q07", "Q08", "Q09", "Q10", "Q11", "Q12",
  "Q13", "Q14", "Q15", "Q16", "Q17", "Q18", "Q19", "Q20", "Q21", "Q22", "Q23", "Q24",
  "Q25", "Q26", "Q27", "Q28", "Q29", "Q30", "Q31", "Q32", "Q33", "Q34", "Q35", "Q36",
  "Q37", "Q38", "Q39", "Q40", "Q41", "Q42", "Q43", "Q44", "Q45", "Q46", "Q47", "Q48",
  "Q01_meta", "Q02_meta", "Q03_meta", "Q04_meta", "Q05_meta", "Q06_meta", "Q07_meta", "Q08_meta",
  "Q09_meta", "Q10_meta", "Q11_meta", "Q12_meta", "Q13_meta", "Q14_meta", "Q15_meta", "Q16_meta",
  "Q17_meta", "Q18_meta", "Q19_meta", "Q20_meta", "Q21_meta", "Q22_meta", "Q23_meta", "Q24_meta",
  "Q25_meta", "Q26_meta", "Q27_meta", "Q28_meta", "Q29_meta", "Q30_meta", "Q31_meta", "Q32_meta",
  "Q33_meta", "Q34_meta", "Q35_meta", "Q36_meta", "Q37_meta", "Q38_meta", "Q39_meta", "Q40_meta",
  "Q41_meta", "Q42_meta", "Q43_meta", "Q44_meta", "Q45_meta", "Q46_meta", "Q47_meta", "Q48_meta",
  "pageUrl", "referrer", "userAgent", "language", "viewport", "timezone", "schemaVersion", "answersJson", "resultJson"
];

var FEEDBACK_LABELS = [
  "事件名称", "反馈ID", "提交时间", "测试结果是否符合本人", "结果类型代码", "结果类型名称",
  "置信度等级", "平均区分度",
  "维度1名称", "问题取向代码", "问题取向名称", "探索型百分比", "建构型百分比",
  "维度2名称", "方法取向代码", "方法取向名称", "概念型百分比", "证据型百分比",
  "维度3名称", "工作节奏代码", "工作节奏名称", "沉潜型百分比", "交互型百分比",
  "维度4名称", "学术表达代码", "学术表达名称", "锋利型百分比", "综合型百分比",
  "Q01", "Q02", "Q03", "Q04", "Q05", "Q06", "Q07", "Q08", "Q09", "Q10", "Q11", "Q12",
  "Q13", "Q14", "Q15", "Q16", "Q17", "Q18", "Q19", "Q20", "Q21", "Q22", "Q23", "Q24",
  "Q25", "Q26", "Q27", "Q28", "Q29", "Q30", "Q31", "Q32", "Q33", "Q34", "Q35", "Q36",
  "Q37", "Q38", "Q39", "Q40", "Q41", "Q42", "Q43", "Q44", "Q45", "Q46", "Q47", "Q48",
  "Q01_meta", "Q02_meta", "Q03_meta", "Q04_meta", "Q05_meta", "Q06_meta", "Q07_meta", "Q08_meta",
  "Q09_meta", "Q10_meta", "Q11_meta", "Q12_meta", "Q13_meta", "Q14_meta", "Q15_meta", "Q16_meta",
  "Q17_meta", "Q18_meta", "Q19_meta", "Q20_meta", "Q21_meta", "Q22_meta", "Q23_meta", "Q24_meta",
  "Q25_meta", "Q26_meta", "Q27_meta", "Q28_meta", "Q29_meta", "Q30_meta", "Q31_meta", "Q32_meta",
  "Q33_meta", "Q34_meta", "Q35_meta", "Q36_meta", "Q37_meta", "Q38_meta", "Q39_meta", "Q40_meta",
  "Q41_meta", "Q42_meta", "Q43_meta", "Q44_meta", "Q45_meta", "Q46_meta", "Q47_meta", "Q48_meta",
  "页面URL", "来源页面", "设备UA", "语言", "视口", "时区", "量表版本", "48题答案JSON", "完整结果JSON"
];

/* ------------------------------------------------------------------ *
 * 事件与视图命名（与 app.js 埋点一致）
 * ------------------------------------------------------------------ */

var EV = {
  PAGE_VIEW: "page_view",
  TEST_START: "test_start",
  ANSWER: "question_answer",
  COMPLETE: "test_complete",
  VIEW_SHOW: "view_show",
  TAB_CLICK: "tab_click",
  BUTTON_CLICK: "button_click",
  RESULT_ACTION: "result_action_click",
  SHARE_CONFIRM: "share_confirm"
};

var EVENT_LABELS = {
  page_view: "页面访问",
  test_start: "开始测试",
  question_answer: "作答",
  test_complete: "完成测试",
  view_show: "进入页面",
  tab_click: "Tab 点击",
  button_click: "按钮点击",
  result_action_click: "结果页操作",
  share_confirm: "确认分享"
};

var VIEW_LABELS = {
  home: "首页",
  test: "测试页",
  result: "结果页",
  styles: "16 种学术风格",
  report: "深度报告页",
  play: "扩展玩法"
};

/* 结果页目前没有入口直达这些视图。看板会标注出来，
   避免把「0 点击」误读成「用户不感兴趣」。 */
var UNREACHABLE_VIEWS = { styles: true, report: true, play: true };

/* ------------------------------------------------------------------ *
 * doPost —— 写入
 * ------------------------------------------------------------------ */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (lockError) {
    return json_({ ok: false, error: "lock-timeout" });
  }

  try {
    var raw = e && e.postData ? e.postData.contents : "";
    var payload = JSON.parse(raw || "{}");
    var kind = payload.eventName;

    if (kind === "academic_compass_analytics") {
      var eventId = String(payload.eventId || ("EV-" + Date.now() + "-" + randomToken_()));
      if (seenRecently_(eventId)) return json_({ ok: true, eventId: eventId, deduped: true });
      appendByKeys_(sheet_(CONFIG.analyticsSheet), ANALYTICS_KEYS, ANALYTICS_LABELS, payload);
      markSeen_(eventId);
      return json_({ ok: true, eventId: eventId });
    }

    if (kind === "academic_compass_feedback") {
      var feedbackId = String(payload.feedbackId || ("FB-" + Date.now() + "-" + randomToken_()));
      if (seenRecently_(feedbackId)) return json_({ ok: true, feedbackId: feedbackId, deduped: true });
      appendByKeys_(sheet_(CONFIG.feedbackSheet), FEEDBACK_KEYS, FEEDBACK_LABELS, payload);
      markSeen_(feedbackId);
      return json_({ ok: true, feedbackId: feedbackId });
    }

    return json_({ ok: false, error: "unknown-event-name" });
  } catch (error) {
    return json_({ ok: false, error: String((error && error.message) || error) });
  } finally {
    lock.releaseLock();
  }
}

/* ------------------------------------------------------------------ *
 * doGet —— 汇总 / 原始数据 / 反馈
 * 参数：mode=summary|events|feedback-json|ping   token=口令
 *      since=YYYY-MM-DD  until=YYYY-MM-DD  callback=JSONP 回调名  nocache=1  limit=条数
 * ------------------------------------------------------------------ */

function doGet(e) {
  var p = (e && e.parameter) || {};
  var callback = sanitizeCallback_(p.callback);
  var mode = p.mode || "summary";

  if (!isAuthorized_(p.token)) {
    return respond_({
      ok: false,
      error: "unauthorized",
      message: "口令不正确。检查 URL 的 token 参数，以及脚本 CONFIG.adminToken 是否还是空字符串。"
    }, callback);
  }

  try {
    if (mode === "ping") {
      return respond_({ ok: true, service: "academic-compass-monitor", version: VERSION }, callback);
    }

    if (mode === "summary") {
      var payload = buildSummary_(p.since || "", p.until || "", p.nocache === "1");
      payload.ok = true;
      payload.version = VERSION;
      return respond_(payload, callback);
    }

    if (mode === "events") {
      var events = readAnalytics_();
      var limit = Math.min(Math.max(Number(p.limit) || 5000, 1), CONFIG.maxRows);
      return respond_({ ok: true, count: events.length, events: events.slice(-limit) }, callback);
    }

    if (mode === "feedback-json") {
      var rows = readSheetObjects_(sheet_(CONFIG.feedbackSheet), FEEDBACK_KEYS, FEEDBACK_LABELS);
      var fbLimit = Math.min(Math.max(Number(p.limit) || 2000, 1), CONFIG.maxRows);
      return respond_({ ok: true, count: rows.length, feedback: rows.slice(-fbLimit) }, callback);
    }

    return respond_({ ok: false, error: "unknown-mode" }, callback);
  } catch (error) {
    return respond_({ ok: false, error: String((error && error.message) || error) }, callback);
  }
}

/* ------------------------------------------------------------------ *
 * 汇总
 * ------------------------------------------------------------------ */

function buildSummary_(since, until, skipCache) {
  var cacheKey = "academicCompassSummary:" + since + "|" + until;
  var cache = null;
  try {
    cache = CacheService.getScriptCache();
    if (!skipCache) {
      var hit = cache.get(cacheKey);
      if (hit) return JSON.parse(hit);
    }
  } catch (cacheError) {
    cache = null;
  }

  var result = computeSummary_(since, until);

  if (cache) {
    var serialized = JSON.stringify(result);
    if (serialized.length < 90000) {
      try {
        cache.put(cacheKey, serialized, CONFIG.cacheSeconds);
      } catch (putError) {
        /* 缓存失败不影响返回 */
      }
    }
  }
  return result;
}

function computeSummary_(since, until) {
  var deduped = dedupeById_(readAnalytics_());

  var fromTs = dayStart_(since);
  var untilTs = dayEnd_(until);
  var scoped = [];
  for (var i = 0; i < deduped.length; i += 1) {
    var ev = deduped[i];
    var ts = eventTs_(ev);
    if (ts === null) {
      if (fromTs === null && untilTs === null) scoped.push(ev);
      continue;
    }
    if (fromTs !== null && ts < fromTs) continue;
    if (untilTs !== null && ts > untilTs) continue;
    scoped.push(ev);
  }

  var byEvent = groupByEvent_(scoped);
  var pageViews = byEvent[EV.PAGE_VIEW] || [];
  var started = byEvent[EV.TEST_START] || [];
  var answered = byEvent[EV.ANSWER] || [];
  var completed = byEvent[EV.COMPLETE] || [];
  var viewShows = byEvent[EV.VIEW_SHOW] || [];
  var tabClicks = byEvent[EV.TAB_CLICK] || [];
  var buttonClicks = byEvent[EV.BUTTON_CLICK] || [];
  var resultActions = byEvent[EV.RESULT_ACTION] || [];
  var shareConfirms = byEvent[EV.SHARE_CONFIRM] || [];

  var visitUv = uniqCount_(pageViews, "visitorId");
  var startUv = uniqCount_(started, "visitorId");
  var participantUv = uniqCount_(started.concat(answered, completed), "visitorId");
  var completeUv = uniqCount_(completed, "visitorId");

  var summary = {
    pv: pageViews.length,
    viewUv: visitUv,
    startUv: startUv,
    testUv: participantUv,
    completeUv: completeUv,
    answerCount: answered.length,
    completeRate: ratio_(completeUv, participantUv),
    participateRate: ratio_(participantUv, visitUv),
    resultActions: groupClicks_(
      resultActions.concat(shareConfirms),
      function (ev) {
        return ev.buttonText || ev.buttonId || EVENT_LABELS[ev.analyticsEvent] || ev.analyticsEvent;
      },
      completeUv
    ),
    views: buildViewRows_(viewShows, tabClicks.concat(buttonClicks), completeUv),
    types: groupCount_(
      completed,
      function (ev) { return ev.typeName || ev.typeCode || "未记录"; },
      completeUv
    ),
    sources: buildSourceRows_(pageViews, visitUv),
    feedback: buildFeedbackRows_()
  };

  return {
    range: { since: since || "", until: until || "" },
    summary: summary,
    trend: buildTrend_(scoped),
    recent: buildRecent_(scoped),
    generatedAt: new Date().toISOString()
  };
}

function buildViewRows_(viewShows, clicks, denominator) {
  var clickMap = {};
  for (var i = 0; i < clicks.length; i += 1) {
    var ev = clicks[i];
    var key = ev.targetView || ev.viewId || "";
    if (!key) continue;
    if (!clickMap[key]) clickMap[key] = { count: 0, visitors: {} };
    clickMap[key].count += 1;
    if (ev.visitorId) clickMap[key].visitors[ev.visitorId] = true;
  }

  var arrivalMap = {};
  for (var j = 0; j < viewShows.length; j += 1) {
    var show = viewShows[j];
    var vid = show.viewId || "";
    if (!vid) continue;
    if (!arrivalMap[vid]) arrivalMap[vid] = {};
    if (show.visitorId) arrivalMap[vid][show.visitorId] = true;
  }

  var keys = {};
  Object.keys(clickMap).forEach(function (k) { keys[k] = true; });
  Object.keys(arrivalMap).forEach(function (k) { keys[k] = true; });

  var rows = Object.keys(keys).map(function (key) {
    var click = clickMap[key] || { count: 0, visitors: {} };
    var clickUv = Object.keys(click.visitors).length;
    return {
      key: key,
      label: VIEW_LABELS[key] || key,
      clickUv: clickUv,
      clickCount: click.count,
      arrivalUv: Object.keys(arrivalMap[key] || {}).length,
      rate: ratio_(clickUv, denominator),
      unreachable: !!UNREACHABLE_VIEWS[key]
    };
  });

  rows.sort(function (a, b) { return (b.clickUv - a.clickUv) || (b.arrivalUv - a.arrivalUv); });
  return rows;
}

function buildSourceRows_(pageViews, visitUv) {
  var map = {};
  for (var i = 0; i < pageViews.length; i += 1) {
    var ev = pageViews[i];
    var label = referrerLabel_(ev.referrer);
    if (!map[label]) map[label] = {};
    if (ev.visitorId) map[label][ev.visitorId] = true;
  }
  var rows = Object.keys(map).map(function (label) {
    var uv = Object.keys(map[label]).length;
    return { label: label, uv: uv, share: ratio_(uv, visitUv) };
  });
  rows.sort(function (a, b) { return b.uv - a.uv; });
  return rows;
}

function buildFeedbackRows_() {
  var rows = readSheetObjects_(sheet_(CONFIG.feedbackSheet), FEEDBACK_KEYS, FEEDBACK_LABELS);
  var counts = {};
  for (var i = 0; i < rows.length; i += 1) {
    var fit = String(rows[i]["测试结果是否符合本人"] || "").replace(/\s+/g, "") || "未填";
    counts[fit] = (counts[fit] || 0) + 1;
  }
  var total = rows.length;
  var out = Object.keys(counts).map(function (label) {
    return { label: label, count: counts[label], share: ratio_(counts[label], total) };
  });
  out.sort(function (a, b) { return b.count - a.count; });
  return { total: total, rows: out };
}

function buildTrend_(events) {
  var map = {};
  for (var i = 0; i < events.length; i += 1) {
    var ev = events[i];
    var ts = eventTs_(ev);
    if (ts === null) continue;
    var day = dayKey_(ts);
    if (!map[day]) map[day] = { day: day, pv: 0, visitUv: {}, testUv: {}, completeUv: {} };
    var bucket = map[day];
    var isParticipant = ev.analyticsEvent === EV.TEST_START ||
      ev.analyticsEvent === EV.ANSWER ||
      ev.analyticsEvent === EV.COMPLETE;
    if (ev.analyticsEvent === EV.PAGE_VIEW) {
      bucket.pv += 1;
      if (ev.visitorId) bucket.visitUv[ev.visitorId] = true;
    }
    if (isParticipant && ev.visitorId) bucket.testUv[ev.visitorId] = true;
    if (ev.analyticsEvent === EV.COMPLETE && ev.visitorId) bucket.completeUv[ev.visitorId] = true;
  }
  return Object.keys(map).sort().map(function (day) {
    var bucket = map[day];
    return {
      day: day,
      pv: bucket.pv,
      visitUv: Object.keys(bucket.visitUv).length,
      testUv: Object.keys(bucket.testUv).length,
      completeUv: Object.keys(bucket.completeUv).length
    };
  });
}

function buildRecent_(events) {
  return events.slice(-CONFIG.recentLimit).reverse().map(function (ev) {
    return {
      createdAt: ev.createdAt || "",
      event: EVENT_LABELS[ev.analyticsEvent] || ev.analyticsEvent,
      analyticsEvent: ev.analyticsEvent,
      detail: ev.buttonText || ev.typeName || VIEW_LABELS[ev.viewId] || ev.viewId ||
        ev.targetView || ev.questionId || "",
      visitorId: shortId_(ev.visitorId)
    };
  });
}

/* ------------------------------------------------------------------ *
 * 聚合小工具
 * ------------------------------------------------------------------ */

function groupByEvent_(events) {
  var map = {};
  for (var i = 0; i < events.length; i += 1) {
    var name = events[i].analyticsEvent || "";
    if (!map[name]) map[name] = [];
    map[name].push(events[i]);
  }
  return map;
}

function uniqCount_(events, field) {
  var seen = {};
  var count = 0;
  for (var i = 0; i < events.length; i += 1) {
    var value = events[i][field];
    if (!value || seen[value]) continue;
    seen[value] = true;
    count += 1;
  }
  return count;
}

function groupClicks_(events, selector, denominator) {
  var map = {};
  for (var i = 0; i < events.length; i += 1) {
    var ev = events[i];
    var label = selector(ev) || "未命名";
    if (!map[label]) map[label] = { count: 0, visitors: {} };
    map[label].count += 1;
    if (ev.visitorId) map[label].visitors[ev.visitorId] = true;
  }
  var rows = Object.keys(map).map(function (label) {
    var uv = Object.keys(map[label].visitors).length;
    return { label: label, uv: uv, count: map[label].count, rate: ratio_(uv, denominator) };
  });
  rows.sort(function (a, b) { return (b.uv - a.uv) || (b.count - a.count); });
  return rows;
}

function groupCount_(events, selector, denominator) {
  var map = {};
  for (var i = 0; i < events.length; i += 1) {
    var ev = events[i];
    var label = selector(ev) || "未命名";
    if (!map[label]) map[label] = { count: 0, visitors: {} };
    map[label].count += 1;
    if (ev.visitorId) map[label].visitors[ev.visitorId] = true;
  }
  var rows = Object.keys(map).map(function (label) {
    var uv = Object.keys(map[label].visitors).length;
    return { label: label, uv: uv, count: map[label].count, share: ratio_(uv, denominator) };
  });
  rows.sort(function (a, b) { return (b.uv - a.uv) || (b.count - a.count); });
  return rows;
}

function ratio_(numerator, denominator) {
  if (!denominator) return 0;
  return Math.round((numerator / denominator) * 1000) / 10;
}

function dedupeById_(events) {
  var seen = {};
  var out = [];
  for (var i = 0; i < events.length; i += 1) {
    var id = events[i].eventId;
    if (id) {
      if (seen[id]) continue;
      seen[id] = true;
    }
    out.push(events[i]);
  }
  return out;
}

function eventTs_(ev) {
  var t = Date.parse(ev.createdAt || "");
  return isNaN(t) ? null : t;
}

function dayKey_(ts) {
  return new Date(ts + CONFIG.tzOffsetMinutes * 60000).toISOString().slice(0, 10);
}

function dayStart_(dateText) {
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateText || ""));
  if (!m) return null;
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 0, 0, 0, 0) -
    CONFIG.tzOffsetMinutes * 60000;
}

function dayEnd_(dateText) {
  var start = dayStart_(dateText);
  return start === null ? null : start + 86399999;
}

function referrerLabel_(referrer) {
  var value = String(referrer || "").trim();
  if (!value) return "直接访问";
  var host = value.replace(/^[a-z]+:\/\//i, "").split("/")[0].toLowerCase();
  var rules = [
    [/zhangqiaokeyan/, "掌桥科研"],
    [/nome159\.github\.io/, "站内"],
    [/mp\.weixin|weixin|wechat|qq\.com/, "微信 / QQ"],
    [/xiaohongshu|xhs/, "小红书"],
    [/douyin|bytedance/, "抖音"],
    [/zhihu/, "知乎"],
    [/baidu/, "百度"],
    [/sogou/, "搜狗"],
    [/google/, "Google"],
    [/bing/, "Bing"],
    [/weibo/, "微博"]
  ];
  for (var i = 0; i < rules.length; i += 1) {
    if (rules[i][0].test(host)) return rules[i][1];
  }
  return host || "其他";
}

function shortId_(value) {
  var text = String(value || "");
  return text ? text.slice(-6) : "";
}

/* ------------------------------------------------------------------ *
 * Sheet 读写
 * ------------------------------------------------------------------ */

function sheet_(name) {
  var spreadsheet = openSpreadsheet_();
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

/**
 * 拿到承载数据的表格。
 * 优先用脚本绑定的表格 —— 从「扩展程序 → Apps Script」进编辑器时就属于这种绑定脚本，
 * 此时不需要任何 ID，也不需要额外授权。
 * 只有在独立脚本（没绑定表格）时才回退到 CONFIG.spreadsheetId。
 */
function openSpreadsheet_() {
  try {
    var bound = SpreadsheetApp.getActiveSpreadsheet();
    if (bound) return bound;
  } catch (error) {
    /* 独立脚本调用会抛错，继续走下面的 ID 分支 */
  }

  var id = String(CONFIG.spreadsheetId || "").trim();
  if (!id) {
    throw new Error(
      "找不到表格：这个脚本没有绑定任何 Google 表格，且 CONFIG.spreadsheetId 是空的。" +
      "推荐做法是从你的表格里依次点「扩展程序 → Apps Script」重建脚本；" +
      "或把表格 ID 填进 CONFIG.spreadsheetId。"
    );
  }

  try {
    return SpreadsheetApp.openById(id);
  } catch (error) {
    throw new Error(
      "打不开表格 " + id + "。请依次确认：ID 是否写对、表格是否已被删除、你的账号有没有访问权限。" +
      "（表格被删除时 Google 返回 410 Gone，换一个新的空表格即可）"
    );
  }
}

function ensureHeader_(sheet, labels) {
  var lastRow = sheet.getLastRow();
  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var existing = [];
  if (lastRow > 0) {
    existing = sheet.getRange(1, 1, 1, Math.max(lastCol, labels.length)).getValues()[0]
      .map(function (v) { return String(v == null ? "" : v).replace(/^\s+|\s+$/g, ""); });
    while (existing.length && !existing[existing.length - 1]) existing.pop();
  }

  if (existing.length === 0) {
    sheet.getRange(1, 1, 1, labels.length).setValues([labels]);
    sheet.setFrozenRows(1);
    return labels.slice();
  }

  var missing = [];
  for (var i = 0; i < labels.length; i += 1) {
    if (existing.indexOf(labels[i]) === -1) missing.push(labels[i]);
  }
  if (missing.length) {
    sheet.getRange(1, existing.length + 1, 1, missing.length).setValues([missing]);
    return existing.concat(missing);
  }
  return existing;
}

function appendByKeys_(sheet, keys, labels, record) {
  var header = ensureHeader_(sheet, labels);
  var row = [];
  for (var i = 0; i < header.length; i += 1) row.push("");
  for (var k = 0; k < keys.length; k += 1) {
    var col = header.indexOf(labels[k]);
    if (col >= 0) row[col] = normalizeValue_(record[keys[k]]);
  }
  sheet.appendRow(row);
}

function readSheetObjects_(sheet, keys, labels) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var values = sheet.getRange(1, 1, Math.min(lastRow, CONFIG.maxRows + 1), lastCol).getValues();
  var header = values[0].map(function (v) {
    return String(v == null ? "" : v).replace(/^\s+|\s+$/g, "");
  });

  var columnOfKey = {};
  for (var k = 0; k < keys.length; k += 1) {
    var col = header.indexOf(labels[k]);
    if (col >= 0) columnOfKey[keys[k]] = col;
  }

  var out = [];
  for (var r = 1; r < values.length; r += 1) {
    var rowValues = values[r];
    var blank = true;
    for (var c = 0; c < rowValues.length; c += 1) {
      if (rowValues[c] !== "" && rowValues[c] !== null) { blank = false; break; }
    }
    if (blank) continue;

    var item = {};
    for (var key in columnOfKey) {
      if (!columnOfKey.hasOwnProperty(key)) continue;
      var raw = rowValues[columnOfKey[key]];
      item[key] = raw == null
        ? ""
        : (raw instanceof Date ? raw.toISOString() : String(raw));
    }
    out.push(item);
  }
  return out;
}

function readAnalytics_() {
  return readSheetObjects_(sheet_(CONFIG.analyticsSheet), ANALYTICS_KEYS, ANALYTICS_LABELS);
}

/* ------------------------------------------------------------------ *
 * 幂等与工具
 * ------------------------------------------------------------------ */

function seenRecently_(id) {
  try {
    return !!CacheService.getScriptCache().get("seen:" + id);
  } catch (error) {
    return false;
  }
}

function markSeen_(id) {
  try {
    CacheService.getScriptCache().put("seen:" + id, "1", CONFIG.idCacheSeconds);
  } catch (error) {
    /* 忽略 */
  }
}

function isAuthorized_(token) {
  var expected = String(CONFIG.adminToken || "");
  if (!expected) return false;
  return String(token || "") === expected;
}

function sanitizeCallback_(name) {
  var value = String(name || "");
  return /^[A-Za-z_$][A-Za-z0-9_$.]{0,60}$/.test(value) ? value : "";
}

function randomToken_() {
  return Math.random().toString(36).slice(2, 8);
}

function normalizeValue_(value) {
  if (value === undefined || value === null) return "";
  if (typeof value === "object") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return value;
  return String(value);
}

function json_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

function respond_(body, callback) {
  if (callback) {
    return ContentService
      .createTextOutput(callback + "(" + JSON.stringify(body) + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return json_(body);
}

/* ------------------------------------------------------------------ *
 * 自检：在 Apps Script 编辑器里手动运行一次，确认表格可读写
 * ------------------------------------------------------------------ */

function selfCheck() {
  var lines = [];
  lines.push("口令 CONFIG.adminToken = " + (CONFIG.adminToken ? "已设置" : "【未设置】—— 汇总接口会一律拒绝返回数据"));
  lines.push("埋点表「" + CONFIG.analyticsSheet + "」现有 " +
    Math.max(sheet_(CONFIG.analyticsSheet).getLastRow() - 1, 0) + " 行");
  lines.push("反馈表「" + CONFIG.feedbackSheet + "」现有 " +
    Math.max(sheet_(CONFIG.feedbackSheet).getLastRow() - 1, 0) + " 行");
  var result = buildSummary_("", "", true);
  lines.push("汇总自检：PV=" + result.summary.pv +
    "  参与UV=" + result.summary.testUv +
    "  完成UV=" + result.summary.completeUv);
  var text = lines.join("\n");
  Logger.log(text);
  return text;
}
