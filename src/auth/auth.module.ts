import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { User } from "./user.entity";

@Module({
  imports: [
    // Passport 모듈 등록
    PassportModule.register({ defaultStrategy: "jwt" }),
    // JWT 모듈 등록 (생성을 위한 secretKey)
    JwtModule.register({ secret: "Secret1234", signOptions: { expiresIn: 60 * 60 } }), // 60 * 60 = 1시간
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  // JWT를 이 Auth 모듈에서 사용할 수 있게 등록
  providers: [AuthService, JwtStrategy],
  // JwtStrategy, PassportModule을 다른 모듈에서 사용할 수 있도록 등록ㄴ
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
