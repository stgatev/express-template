import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as swaggerize from 'swaggerize-express';
import * as swaggerUi from 'swaggerize-ui';
import * as uuid from 'uuid';
import * as config from 'config';

// Make the request id available to morgan so each log entry is tagged with it
morgan.token('id', (req) => { return (req as any).id; });

// In addition to environment-specific configuration files, configuration may be read
// from environment variables. The optional step below puts copies of the environment variables 
// in the config module. Since the config module is a singleton, they will be available everywhere 
// by simply importing config:
//
//     import * as config from 'config';
//
// This may also be a good place to store configuration that is only available at run time, 
// but does not change once the application runs.
config['foo'] = process.env['foo'];

class App {
    public express: express.Application;

    constructor() {
        this.express = express()
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({ extended: false }))

            .use((req, res, next) => { (req as any).id = uuid.v4(); next(); })
            .use(morgan(config.has('logger.format') ? config.get('logger.format') as string : 'dev'))

            // REST handlers
            .use(swaggerize({
            api: path.resolve('./spec/api.json'),
            handlers: path.resolve('./dist/handlers'),
                docspath: '/swagger/docs'
            }))

            // Static content
            .use('/data', express.static('data'))

            // API spec
            .use('/swagger', swaggerUi({
                docs: '/swagger/docs'
            }));
    }
}

export default new App().express;