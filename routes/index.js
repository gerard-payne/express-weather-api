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
            oResponse.status(200).json(response).end();
            return oResponse;
        }
    );

    router.post(
        "/weather/:location",
        async (oRequest, oResponse) => {
            /* here I would handle post request, same way just different firebase calls.
            but this app already adds pretty much anything,
            to this end I would actually use cityList to create restrictions
            then add date checks to make sure the data is fresh enough*/
            // const response = await newLocation(oRequest.params.location);
            oResponse.status(501).end();
            return oResponse;
        }
    );

    return router;
};

export default routes();
