import tenantJson from "../json/tenants.json" assert { type: "json" };   

export const up = async (db, client) => {
      await db.collection('tenants')
    .insertMany(tenantJson);     
    await db.collection('tenants')
      .updateMany({}, { $set: { createdAt: new Date(), updatedAt: new Date() } });     
        
};

export const down = async (db, client) => {
    await db.dropCollection('tenants');
};
