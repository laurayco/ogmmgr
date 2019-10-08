import * as express from "express";
import { resolve } from "path";
import config from "./config";

async function main() {
    const port = await config.port;
    const htmldir = await config.output_directory;
    const app = express();
    
    app.use(express.static(resolve(htmldir)));
    
    app.listen(port);
}

main();