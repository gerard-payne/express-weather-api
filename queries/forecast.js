import admin from "firebase-admin";
import axios from "axios";

const forecast = async (sLocation) => {
    const db = admin.firestore();
    const collection = await db.collection("weather").doc(sLocation);
    const query = await collection.get();
    const result = query.data();

    if (!result) {
        console.warn("no record", sLocation);
        const record = await getMissingRecord(sLocation);
        return record;
    }

    return result;
};

const getMissingRecord = async (sLocation) => {
    const API_KEY = process.env.OPENMAP_API_KEY; // only used here, only in scope here

    const ajax = await axios({
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${sLocation}&appid=${API_KEY}`,
        responseType: "json"
    });
    const result = await addMissingRecord(ajax.data);
    return result;
};

const addMissingRecord = async (oResult) => {
    const db = admin.firestore();
    const {list, city} = oResult;
    console.log("adding record", city.name);
    db.collection("weather").doc(city.name.toLowerCase()).set({list});
    return list;
};

export {forecast};
