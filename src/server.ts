import * as config from 'config';
import * as http from 'http';
import app from './app';

const port = process.env.PORT || (config.has('server.port') ? config.get('server.port') : undefined) || 8000;
const server = http.createServer(app);
server.listen(port);
