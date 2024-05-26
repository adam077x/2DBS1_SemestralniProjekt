export const dbConfig = {
  user: process.env.DB_USER || 'system',
  password: process.env.DB_PASSWORD || 'welcome123',
  connectString: process.env.DB_CONNECT_STRING || 'localhost/xe',
};
