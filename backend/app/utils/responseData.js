"use strict";

exports.createResponseData = ({ success = true, data, msg = '' }) => ({ success, result: data, msg })
