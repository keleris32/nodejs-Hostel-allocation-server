'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CreateRefreshToken = exports.CreateAccessToken = void 0;
const jsonwebtoken_1 = require('jsonwebtoken');
const CreateAccessToken = (matric_no, gender) => {
  return (0, jsonwebtoken_1.sign)(
    { matricNumber: matric_no, gender: gender },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  );
};
exports.CreateAccessToken = CreateAccessToken;
const CreateRefreshToken = (matric_no) => {
  return (0, jsonwebtoken_1.sign)(
    { matricNumber: matric_no },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  );
};
exports.CreateRefreshToken = CreateRefreshToken;
//# sourceMappingURL=createToken.js.map
