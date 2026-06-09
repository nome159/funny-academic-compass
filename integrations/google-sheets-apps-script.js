const SPREADSHEET_ID = "1cjO0Cn-GY4MEI5tH63YiGaP0a19bDdxzahlsrk_gdnk";
const SHEET_NAME = "academic_compass_feedback";

const HEADER_KEYS = [
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

const HEADER_LABELS = [
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

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const sheet = getTargetSheet_();
    ensureHeader_(sheet);
    sheet.appendRow(HEADER_KEYS.map((key) => normalizeValue_(payload[key])));
    return json_({ ok: true, feedbackId: payload.feedbackId || "" });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  } finally {
    lock.releaseLock();
  }
}

function getTargetSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow(HEADER_LABELS);
  sheet.setFrozenRows(1);
}

function normalizeValue_(value) {
  if (value === undefined || value === null) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return value;
}

function json_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
