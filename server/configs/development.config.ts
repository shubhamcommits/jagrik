import path from 'path';

/**
 * This function is responsible for initilising the development configuration and environment variables
 */
function devConfigInit() {
  // Node Environment
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'

  // Application Port
  process.env.PORT = process.env.PORT || '3000'

  // Application Host
  process.env.HOST = process.env.HOST || '0.0.0.0'

  // Jwt Key
  process.env.JWT_KEY = process.env.JWT_KEY || 'default_value'

  // URL
  process.env.URL = process.env.URL || `http://localhost:4200`

  // Sendgrid Key
  process.env.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "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"

  // Database Url String
  process.env.dbURL = process.env.dbURL || `mongodb://127.0.0.1:27017/jagrik`

  // Files Uploads Folder
  process.env.FILE_UPLOAD_FOLDER =
    process.env.FILE_UPLOAD_FOLDER || path.join(__dirname, '../uploads/')
}

export { devConfigInit as developmentConfig };
