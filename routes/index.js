import {Router} from "express";
import {cityList, forecast} from "../queries/index.js";

const router = new Router();

const routes = () => {
    router.get("/", (oRequest, oResponse) => {
        oResponse.status(200).send("Running.").end();
        return oResponse;
    });

    router.get("/test", (oRequest, oResponse) => {
        console.log("/test", true);
        oResponse.status(200).end();
        return oResponse;
    });

    router.get(
        "/cities",
        async (oRequest, oResponse) => {
            const result = await cityList();
            oResponse.status(200).json(result).end();
            return oResponse;
        }
    );

    router.get(
        "/weather/:location",
        async (oRequest, oResponse) => {
            const response = await forecast(oRequest.params.location);
            console.log(response);
            oResponse.status(200).json(response).end();
            return oResponse;
        }
    );

    return router;
};

export default routes();
