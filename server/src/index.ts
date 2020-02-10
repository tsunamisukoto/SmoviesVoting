import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import { json } from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import routes from './routes/index';
import { listen } from 'socket.io';
import { SocketConnection } from './common/socketConnection';

// Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();
    const useHttps = false;
    const port = 3000;
    // Call midlewares
    app.use(cors());
    app.disable('etag');
    app.use(helmet());
    app.use(json());
    app.use((request, response, next) => {
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
    // Set all routes from routes folder
    app.use('/', routes);
    let server: any;
    if (useHttps) {
      server = https.createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/smovies.tsunamisukoto.com/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/smovies.tsunamisukoto.com/fullchain.pem')
      }, app)
        .listen(3000);

    } else {
      server = http.createServer(app);

      server.listen(port, () => {
        console.log(`Server started on port ${port}!`);

      });
    }

    const io = SocketConnection.listen(server);
  })
  .catch(error => console.log(error));
