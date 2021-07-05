import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import routes from "./routes/index.js";

const server = () => {
    const app = express();
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use("/api/v1", routes);
    app.use(function(req, res) {
        res.status(404).end();
    });

    return app;
};

export default server().listen(8080);
