import { Model } from 'mongoose';
import type { AqpQuery } from 'api-query-params';
import type { InsertAck } from 'InsertAck';

/* Generic class to be used by all controllers. No request/response dependencies. */
export class GenericDataService {
	/**
	 * Generic fetch used to support browse/filter GET requests
	 *
	 * @param mongoQuery
	 * @param model
	 * @returns
	 */
	static async fetchData(mongoQuery: AqpQuery, model: Model<T>, lean = false) {
		if (!mongoQuery) mongoQuery = new AqpQuery();

		const { filter, limit, projection } = mongoQuery;
		let { skip, sort } = mongoQuery;
		if (!sort) {
			sort = { createdAt: -1 };
		}

		const query = model
			.find(filter)
			.select(projection)
			.sort(sort)
			.collation({ locale: 'en_US', strength: 1 })
			.skip(skip)
			.limit(limit);

		const data = lean ? await query.lean() : await query.exec();

		const total = await model.countDocuments(filter);
		if (skip == 'undefined') skip = 0;
		return {
			data,
			pagination: {
				limit,
				skip,
				total
			}
		};
	}

	/**
	 * Generic fetch used to support browse/filter GET requests
	 *
	 * @param mongoQuery
	 * @param model
	 * @returns
	 */
	static async fetchOne(mongoQuery: AqpQuery, model: Model<T>, lean = false) {
		const { filter } = mongoQuery;
		const query = model.findOne(filter);

		const data = lean ? await query.lean() : await query.exec();

		return {
			data
		};
	}

	/**
	 * Generic distinct item counts
	 *
	 * @param distinctField
	 * @param mongoQuery
	 * @param model
	 * @returns
	 */
	static async fetchDistinct(distinctField: string, mongoQuery: AqpQuery, model: Model<T>) {
		console.log('distinctField ' + distinctField + ' filter ' + JSON.stringify(mongoQuery.filter));
		const data = await model.distinct(distinctField, mongoQuery.filter).exec();
		//console.log('fetchFromDataStore: query ' + JSON.stringify(filter) + ', total = ' + total);

		return {
			data
		};
	}

	/**
	 * Generic save items function to support POST requests
	 *
	 * @param itemsArr
	 * @param model
	 * @param returnRaw
	 * @returns
	 */
	static async insert(itemsArr: Array<T>, model: Model<T>, returnRaw = false): InsertAck {
		const savedItems: InsertAck = await model.insertMany(itemsArr, {
			rawResult: returnRaw,
			lean: true,
			ordered: false
		});
		if (!savedItems) {
			throw Error('Could not save data');
		}
		return savedItems;
	}

	/**
	 * TODO This doesn't work and needs fixing
	 * Insert items. Ignore the ones that are duplicates based on filter supplied.
	 * @param itemsArr
	 * @param idField
	 * @param model
	 * @param returnRaw
	 * @returns
	 */
	static async insertIgnoreDuplicates(
		itemsArr: Array<T>,
		idField: string,
		model: Model<T>
	): InsertAck {
		const operations = itemsArr.map((doc) => {
			// console.log('Upserting for docs ' + doc[idField]);
			return {
				updateOne: {
					idField: doc[idField],
					update: { $setOnInsert: doc },
					upsert: true
				}
			};
		});

		//console.log('Upserting for docs ' + JSON.stringify(operations[0]));
		const savedItems = await model.bulkWrite(operations);
		if (!savedItems) {
			throw Error('Could not save data');
		}
		return savedItems;
	}

	/**
	 * Update a model
	 *
	 * @param filter
	 * @param updatedData
	 * @param model
	 * @returns
	 */
	static async update(filter: object, updatedData: object, model: Model<T>) {
		// todo
		console.log('Updating for filter ' + JSON.stringify(filter));

		const resp = await model.updateMany(filter, updatedData, {
			safe: true,
			new: false
		});
		if (!resp) {
			throw Error(404, 'Could not update data');
		}
		return resp;
	}

	/* Generic Delete  */
	static async delete(mongoQuery: AqpQuery, model: Model<T>) {
		const { filter } = mongoQuery;
		if (filter.length === 0) {
			throw Error('Nothing to delete.');
		}
		const deletedItems = await model.deleteMany(filter);
		return deletedItems;
	}
}
