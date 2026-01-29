export const ENV_CONFIG = {
  port: process.env.PORT,
  db_uri: process.env.DB_URI!!,
  db_name: process.env.DB_NAME!!,
  node_env: process.env.NODE_ENV,
  cloud_name: process.env.CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
