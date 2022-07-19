import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthCredentialDto } from "./dto/auth-credential.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  register(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.createUser(authCredentialDto);
  }

  @Post("/login")
  login(@Body(ValidationPipe) AuthCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(AuthCredentialDto);
  }

  // 아직 controller에 오기 전에 authGuard를 통해서 user를 return 받은 것!!
  @Post("/authTest")
  @UseGuards(AuthGuard())
  authTest(@Req() req) {
    console.log("여기부터");
    console.log(req);
  }
}
