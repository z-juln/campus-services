"use strict";

exports.createResponseData = ({ success = true, data = {}, msg = '' }) => ({ success, result: data, msg })

// 字段缺失的响应数据
exports.lackDataResponse = { success: false, msg: "字段缺失" }
