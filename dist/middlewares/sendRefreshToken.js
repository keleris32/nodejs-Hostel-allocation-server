"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendRefreshToken = void 0;
const SendRefreshToken = (res, token) => {
    res.cookie('CEU', token, {
        httpOnly: true,
        path: '/refresh_token',
        sameSite: 'none',
        secure: true,
    });
};
exports.SendRefreshToken = SendRefreshToken;
//# sourceMappingURL=sendRefreshToken.js.map