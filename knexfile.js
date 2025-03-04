import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";

export default {
  client: "mysql2",
  connection: isProduction
    ? {  // ✅ Render will use Clever Cloud credentials
        host: process.env.DB_PROD_HOST,
        user: process.env.DB_PROD_USER,
        password: process.env.DB_PROD_PASSWORD,
        database: process.env.DB_PROD_DBNAME,
        port: process.env.DB_PROD_PORT,
        charset: "utf8",
        ssl: {
          rejectUnauthorized: false,  // Required for Clever Cloud MySQL
        },
      }
    : {  // ✅ Local development (uses .env)
        host: process.env.DB_LOCAL_HOST,
        user: process.env.DB_LOCAL_USER,
        password: process.env.DB_LOCAL_PASSWORD,
        database: process.env.DB_LOCAL_DBNAME,
        port: process.env.DB_LOCAL_PORT,
        charset: "utf8",
      },
};

