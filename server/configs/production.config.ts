import path from 'path';

/**
 * This function is responsible for initilising the production configuration and environment variables
 */
function prodConfigInit() {
  // Node Environment
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';

  // Application Port
  process.env.PORT = process.env.PORT || '3000';

  // Application Host
  process.env.HOST = process.env.HOST || '0.0.0.0';

  // Jwt Key
  process.env.JWT_KEY = process.env.JWT_KEY || 'default_value';

  // Database Url String
  process.env.dbURL =
    process.env.dbURL ||
    `mongodb+srv://jagrik:Jagrik%4001@jagrik-6jrkd.mongodb.net/jagrik?retryWrites=true&w=majority` ||
    'mongodb://mongodb:27017/jagrik' ||
    'mongodb://127.0.0.1:27017/jagrik';

  // URL of the server
  process.env.URL = process.env.URL || 'http://localhost:3000/';

  // Sendgrid Key
  process.env.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "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"

  // Files Uploads Folder
  process.env.FILE_UPLOAD_FOLDER =
    process.env.FILE_UPLOAD_FOLDER || path.join(__dirname, '../uploads/');
}

export { prodConfigInit as productionConfig };
