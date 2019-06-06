import * as express from "express";
import * as utils from "./utils";
import * as CONSTS from "./consts.json";

const app = express();

app.use(express.static(utils.actual_filename("./www")));

app.listen(CONSTS.DEV_PORT);