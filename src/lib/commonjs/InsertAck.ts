export type InsertAck = {
	data: {
		acknowledged: boolean;
		insertedCount: number;
		insertedIds: object;
	};
};
