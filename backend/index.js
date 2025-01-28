const Server = require('./src/Server');
const appConfig = require('./src/config');

const options = {
  port: appConfig.port,
  db_url: appConfig.database_url,
  secret: appConfig.secret,
  nodeEnv: appConfig.env,
  server_url: appConfig.server_url,
  analytics_api_key: appConfig.analytics_api_key,
};

const app = new Server(options);

app.startServer();
