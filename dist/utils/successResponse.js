"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponseBody = void 0;
const successResponseBody = (message, responseData) => {
    return {
        success: true,
        message: message,
        data: responseData,
    };
};
exports.successResponseBody = successResponseBody;
//# sourceMappingURL=successResponse.js.map