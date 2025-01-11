import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto";
import { LocalAuthGuard } from "./guards";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}