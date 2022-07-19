import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";

@Module({
  imports: [
    // Passport 모듈 등록
    PassportModule.register({ defaultStrategy: "jwt" }),
    // JWT 모듈 등록
    JwtModule.register({ secret: "Secret1234", signOptions: { expiresIn: 60 * 60 } }), // 60 * 60 = 1시간
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
