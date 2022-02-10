"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponseBody = void 0;
const errorResponseBody = (message) => {
    return {
        success: false,
        message: message,
        data: null,
    };
};
exports.errorResponseBody = errorResponseBody;
//# sourceMappingURL=errorResponse.js.map