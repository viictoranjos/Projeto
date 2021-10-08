require("./environment/env");
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import router from "./routes";

const app = express ();
app.use(helmet());
app.use(cors<any>());
app.use(express.json());
app.use(morgan('tiny'));
app.use('/',router);

export default app;

