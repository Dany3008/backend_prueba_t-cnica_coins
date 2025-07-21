"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCompany = void 0;
const common_1 = require("@nestjs/common");
exports.GetCompany = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const company = req.user?.companyId;
    return data ? req.user[data] : company;
});
//# sourceMappingURL=get-company.decorator.js.map