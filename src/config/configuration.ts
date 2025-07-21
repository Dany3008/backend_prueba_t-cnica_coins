// src/config/configuration.ts
export default () => ({
  app: {
    port: parseInt(process.env.PORT  ?? '3000', 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN ?? '3600s',
  },
  database: {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT  ?? '3306', 10),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    name: process.env.DB_NAME!,
  },
});