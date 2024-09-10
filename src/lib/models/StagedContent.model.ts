import { model, Schema, Model } from 'mongoose';
import { z } from 'zod';
import { WebUtils } from '$lib/utils/WebUtils';

const ContentStatus = {
	ADDED: 'added',
	FAILED: 'failed',
	PROCESSED: 'processed',
	APPROVED: 'approved',
	PUBLISHED: 'published'
};

const ContentType = {
	SERVICE: 'service',
	PRODUCT: 'product',
	GUIDE: 'guide'
};

/* StagedContent Schema */
const StagedContentSchema: Schema<StagedContent> = new Schema(
	{
		url: {
			type: String,
			required: true,
			unique: true,
			minlength: 3,
			nullable: false,
			validate: {
				validator: function (value) {
					return value !== null;
				},
				message: 'url cannot be null'
			}
		},
		domain: { type: String, required: true, minlength: 3 },
		title: {
			type: String,
			maxlength: 100
		},
		contentType: { type: String, enum: [ContentType], default: ContentType.PRODUCT },
		imageName: { type: String },
		categoryPath: {
			type: String, // Category tree - String in the format 'category.subcategory.sub-subcategory' useed to perform like search:
			default: null
		},
		tagline: {
			type: String,
			maxlength: 100
		},
		// Summarized text data
		features: [
			{
				type: String,
				maxlength: 1000
			}
		],
		summary: [
			{
				type: String,
				maxlength: 2000
			}
		],
		hashtags: [String],

		status: {
			type: String,
			enum: [ContentStatus], // added - entered url; failed - processing failed;  processed - summarized and tagged;  publish - ready to be moved to 'webcontent'
			default: ContentStatus.ADDED
		}
	},
	{ timestamps: true, toJSON: { virtuals: true } }
);

/** StagedContent Schema Validator  */
const StagedContentZod = z.array(
	z.object({
		url: z.string().url('URL must be valid and have a minimum of 3 characters'),
		tags: z.array(z.string().trim().max(5))
	})
);

StagedContentSchema.index({ url: 1, status: 1 }, { unique: true, dropDups: true });
StagedContentSchema.index({ status: 1 });
StagedContentSchema.index({ hashtags: 'text' });

/* Link Model */
const StagedContent: Model<StagedContent> = model('stagedcontent', StagedContentSchema);
StagedContent.syncIndexes();

export { StagedContentZod };
export { StagedContent, ContentStatus, StagedContentSchema };
