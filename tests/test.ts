import { expect, test } from 'vitest';
import { Payload } from '../../../src/routes/api/commonjs/helpers/Payload';

test('about page has expected h1', async ({ page }) => {
	const val = ```json
	{
	  "field1": "value"
	}
	```;

	// Remove surrounding backticks and spaces
	const json_data_cleaned = val.replace(/^```json\s*|\s*```$/g, '');
	console.log('json_data_cleaned ' + json_data_cleaned);

	// Parse the JSON data
	const json_object = JSON.parse(json_data_cleaned);
});
