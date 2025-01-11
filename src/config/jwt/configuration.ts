import { registerAs } from "@nestjs/config";

export default registerAs('jwt', () => ({
    secret: process.env.JWT_ACESS_TOKEN_SECRET,
    expirationMs: process.env.JWT_ACCESS_TOKEN_EXPIRATION_MS,
}));