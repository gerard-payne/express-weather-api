import admin from "firebase-admin";

const cityList = async () => {
    const db = admin.firestore();
    const collection = await db.collection("weather");
    const query = await collection.get();
    const result = [];
    query.forEach((oRecord) => {
        const record = oRecord.data();
        result.push({
            id: record.id,
            city: record.location.city
        });
    });
    return result;
};

export {cityList};
