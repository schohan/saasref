import workerpool from 'workerpool';

export class WorkerWrapper {
	constructor() {
		this.pool = workerpool.pool();
	}

	async run(func, argsArr = []) {
		console.log('Adding to worker pool...');

		try {
			const result = await this.pool.exec(func, argsArr);
			console.log('result', result);
			console.log('terminating');
			this.pool.terminate(); // terminate all workers when done
			return result;
		} catch (err) {
			console.error(err);
		}
	}
}

//----- Following code is just for testing.

// function add(a, b) {
// 	return a + b;
// }

// async function exec() {
// 	const w = new WorkerWrapper();
// 	const res = await w.run(add, [2, 3]);
// 	console.log('Result=> ' + res);
// }

// exec();
