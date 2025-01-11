import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
    name: process.env.APP_NAME,
    host: process.env.APP_URL,
    port: process.env.APP_PORT,
    version: process.env.APP_VERSION
}));