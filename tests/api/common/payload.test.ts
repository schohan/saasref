import { expect, test } from 'vitest';
import { Payload } from '../../../src/routes/api/commonDNU/Payload';

test('should be a valid json', async ({ request }) => {
	const data = { name: 'test1', description: 'test description' };
	const meta = { id: 'test' };
	const payload = new Payload(meta, data);
	const payloadJson: Payload = payload.toJSON();

	expect(payloadJson.data.name).not.toBeFalsy();

	const jsonStr: string = payload.stringify();
	console.log('AFTER Stringify jsonStr: ' + jsonStr);
	expect(jsonStr).to.have.length.greaterThan(50);
});
