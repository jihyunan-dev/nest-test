import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

// parameter를 가져와서 decorator를 만듬
export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
