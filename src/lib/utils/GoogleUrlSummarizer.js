import { json } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AppConfig } from '$lib/config/appConfig';

const promptTempl = `What is the purpose of the website {url}? Write a short title, tagline, summary of few paragraphs wrapped in <p> elements, key features, and 5 hashtags
 describing this service or solution. Return results a json object with these fields: title, tagline, summary, features, and hashtags. Do not wrap json in backticks `;

export class GoogleUrlSummarizer {
	constructor() {
		this.genAI = new GoogleGenerativeAI(AppConfig.secrets.googleGenAIKey);
		this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
	}

	async summarize(url) {
		const prompt = promptTempl.replace('{url}', url);
		const { totalTokens } = await this.model.countTokens(prompt);
		console.log(' prompt : ' + prompt + '. Total tokens: ' + totalTokens);

		const result = await this.model.generateContent(prompt);
		const response = await result.response;
		const jsonText = response.text();
		const cleanJson = jsonText.replace(/^```(json)?\s*|\s*```$/g, '');

		console.log('Read json text: ' + cleanJson);

		return JSON.parse(cleanJson);
	}
}
