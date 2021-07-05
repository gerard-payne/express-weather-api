import admin from "firebase-admin";
import {cityList} from "./cities.js";
import {forecast} from "./forecast.js";

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://gj270419p-default-rtdb.europe-west1.firebasedatabase.app"
});

export {cityList, forecast};
