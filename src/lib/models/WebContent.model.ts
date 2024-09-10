import { model, Schema, Model } from 'mongoose';
import { z } from 'zod';
import { WebUtils } from '$lib/utils/WebUtils';

/* WebContent Schema */
const WebContentSchema: Schema<WebContent> = new Schema(
	{
		url: { type: String, required: true, unique: true, minlength: 3 },
		domain: { type: String, required: true, minlength: 3 },
		title: {
			type: String,
			maxlength: 100
		},
		imageName: { type: String },
		categoryPath: String, // Category tree - String in the format 'category.subcategory.sub-subcategory' useed to perform like search:
		tagline: {
			type: String,
			maxlength: 100
		},
		features: [
			{
				type: String,
				maxlength: 1000
			}
		],
		// Summarized text data
		summary: [
			{
				type: String,
				maxlength: 2000
			}
		],
		hashtags: [String],
		viewCount: { type: Number, default: 0 },
		favCount: { type: Number, default: 0 },
		order: { type: Number, default: 0 } // used for sorting, smaller numbers first
	},
	{ timestamps: true, toJSON: { virtuals: true, getters: true } }
);

// WebContentSchema.pesave('domain').get(function () {
// 	return WebUtils.getDomain(this.url);
// });

WebContentSchema.pre('save', function (next) {
	// 'this' refers to the document being saved
	this.domain = WebUtils.getDomain(this.url);
	console.log('Saving domain ' + this.domain + ' for url ' + this.url);

	next();
});

//WebContentSchema.set('toJSON', { getters: true, virtuals: true });

/** WebContent Schema Validator  */
const WebContentZod = z.object({
	url: z.string().url('URL must be valid and have a minimum of 3 characters'),

	// .refine((value) => value.trim().length > 0, {
	// 	message: 'URL must have a minimum length of 3 characters.'
	// }),
	hashtags: z.array(z.string().trim().max(7))
});

WebContentSchema.index({ url: 1 }, { unique: true, dropDups: true });
WebContentSchema.index({ domain: 1 });
WebContentSchema.index({ categoryPath: 1 });
WebContentSchema.index({ hashtags: 'text' });

/* Link Model */
const WebContent: Model<WebContent> = model('webcontent', WebContentSchema);
WebContent.syncIndexes();

export { WebContentZod };
export { WebContent, WebContentSchema };
