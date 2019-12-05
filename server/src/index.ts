import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import * as https from "https";
import * as fs from "fs";
import routes from "./routes/index";

//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();
    const useHttps = false;
    const port = 3000;
    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/", routes);
    if (useHttps) {
      https.createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/smovies.tsunamisukoto.com/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/smovies.tsunamisukoto.com/fullchain.pem')
      }, app)
        .listen(3000);
    }
    else {
      app.listen(port, () => {
        console.log(`Server started on port ${port}!`);
      });
    }
  })
  .catch(error => console.log(error));