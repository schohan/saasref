import { Validators } from '$lib/utils/mongoose-validators';
import { model, Schema, Model } from 'mongoose';

/* Page Schema
 * Use url and tags.
 */
const PageSchema: Schema = new Schema(
	{
		url: { type: String, required: true, validate: Validators.isUrl() },
		inError: { type: Boolean, default: false },
		tags: [{ type: String }],
		description: { type: String },
		manualDesc: { type: String },
		imageUrls: [{ type: String }],
		mediaType: { type: String },
		htmlText: { type: String },
		entities: [{ type: String }],
		fetchedAt: { type: Date },
		createdAt: { type: Date, required: true, default: new Date() },
		updatedAt: { type: Date, required: true, default: new Date() }
	},
	{
		versionKey: false
	}
);

PageSchema.index({ url: 1, fetchedAt: Date }, { unique: true, background: false, dropDups: true });
PageSchema.index({ tags: 1 });
PageSchema.index({ updatedAt: 1 });

/* Page Model */
const Page: Model<Page> = model<Page>('page', PageSchema);
Page.syncIndexes();

export { PageSchema, Page };
