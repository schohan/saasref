export type InsertAck = {
	data: {
		acknowledged: boolean;
		insertedCount: number;
		insertedIds: object;
	};
};

/* 
{
    "data": {
        "acknowledged": true,
        "insertedCount": 2,
        "insertedIds": {
            "0": "64e74639258b3ac3b6a5ff12",
            "1": "64e74639258b3ac3b6a5ff13"
        }
    }
}
 */
