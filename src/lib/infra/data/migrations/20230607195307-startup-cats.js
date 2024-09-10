import categories from "../json/categories.json" assert { type: "json" };   
    
export const up = async (db) => {    
    /* insert categories */
    await db.collection('categories')
        .insertMany(categories);   
    await db.collection('categories')
        .updateMany({}, { $set: { createdAt: new Date(), updatedAt: new Date() } });     
      
};

export const down = async (db) => {
     await db.dropCollection('categories'); 
};
