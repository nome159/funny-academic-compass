/**
 * 学术罗盘 · 监控采集配置
 *
 * 只需改这一个地方：把 collectEndpoint 换成你的 Apps Script「Web 应用」网址。
 * 该网址一定以 /exec 结尾，形如：
 *   https://script.google.com/macros/s/AKfycb.........../exec
 *
 * 获取方式见 MONITORING-SETUP.md 第 4 步。
 *
 * 留空时的行为：埋点事件只写进访客自己的浏览器，不会上报，
 * 看板上的所有指标都会是 0。所以这一处必须填。
 */

window.ACADEMIC_COMPASS_COLLECT_ENDPOINT = "https://script.google.com/macros/s/AKfycbwRH2SYBW96Kz9qKHSGOSBKoYh7IEt4-4QmVvlvH9bIZN02n50gW8Q0wCdzDwzVWsFc0A/exec";

/* ------------------------------------------------------------------ *
 * 下面不用改。app.js 会读取这几个全局变量。
 * ------------------------------------------------------------------ */

(function () {
  var endpoint = String(window.ACADEMIC_COMPASS_COLLECT_ENDPOINT || "").trim();

  // 允许用 ?collect=<网址> 临时覆盖，方便上线前自测。
  try {
    var override = new URLSearchParams(window.location.search).get("collect");
    if (override) endpoint = override.trim();
  } catch (error) {
    /* 老浏览器忽略 */
  }

  window.ACADEMIC_COMPASS_FEEDBACK_ENDPOINT = endpoint;
  window.ACADEMIC_COMPASS_ANALYTICS_ENDPOINT = endpoint;

  // Apps Script 不返回跨域头，必须用 no-cors 发送纯文本请求，请求仍然会到达服务端。
  window.ACADEMIC_COMPASS_FEEDBACK_MODE = "no-cors";
  window.ACADEMIC_COMPASS_ANALYTICS_MODE = "no-cors";
  window.ACADEMIC_COMPASS_FEEDBACK_ADAPTER = "google-sheets";
})();
