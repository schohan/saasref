//import MiniSearch, { SearchOptions, MiniSearchOptions } from 'minisearch';
import Fuse from 'fuse.js';
import fse from 'fs-extra';
import * as fs from 'fs';
const fsPromises = fs.promises;

/*  A wrapper searvice to provide search feature to application. Minisearch is used
 *  as underying service that can be replaced later if needed.
 **/
export class SearchService {
	private options = { minMatchCharLength: 3 };
	private fuse: Fuse;
	private fieldArr: [string];
	private dataArr: [any];

	constructor(fieldArr: [string], dataArr: T[]) {
		this.options = { ...this.options, keys: fieldArr };
		this.fieldArr = fieldArr;
		this.dataArr = dataArr;
		this.fuse = new Fuse(dataArr, this.options);
	}

	async writeIndexToFile(filename: string) {
		try {
			console.log('filename = ' + filename);
			if (!filename) throw Error('Invalid file name ' + filename);
			fse.ensureFile(filename);
			console.log(filename + ': writing to write index ' + this.fieldArr);
			const index = Fuse.createIndex(this.fieldArr, this.dataArr);
			await fsPromises.writeFile(filename, JSON.stringify(index.toJSON()));
		} catch (err) {
			console.log('Error = ' + err);
			throw new Error('Could not serialize index');
		}
	}

	async removeIndex(filename: string) {
		fse.remove(filename);
	}

	//TODO This has not been tested yet
	async loadIndexFromFile(fileName) {
		const fuseIndexJson = await require(fileName);
		this.index = Fuse.parseIndex(fuseIndexJson, this.options);
		// initialize Fuse with the index
		this.fuse = new Fuse(this.index, this.options, this.index);
	}

	search(queryObj) {
		return this.fuse.search(queryObj);
	}
}
