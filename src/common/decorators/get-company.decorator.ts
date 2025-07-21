// src/common/decorators/get-company.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCompany = createParamDecorator(
  (data: keyof any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const company = req.user?.companyId;
    return data ? req.user[data] : company;
  },
);
