import Logger from '../helpers/logger';
import app from '../app';
import { sequelize } from '../database/config';
import config from '../config';
import { IServerAddress } from '../interfaces';

const normalizePort = (val: string): number | string | boolean => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(config.server.port);

const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      throw new Error();
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      throw new Error();
    default:
      throw error;
  }
};

(async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    const server = app.listen(port as number, 'localhost', (): void => {
      const addr: string | IServerAddress | null = server.address();
      const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : addr !== null
          ? `${addr.address}:${addr.port}`
          : `port ${addr}`;
      Logger.info(`Listening on http://${bind}`);
    });
    server.on('error', onError);
  } catch (err) {
    throw new Error(`Unable to connect to the database: ${err}`);
  }
})();
