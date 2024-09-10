import { model, Schema, Model } from 'mongoose';
import { WebUtils } from '$lib/utils/WebUtils';

const SubCatSchema = new Schema(
	{
		uid: { type: String, required: true, minlength: 3 },
		title: { type: String, required: true, minlength: 4 }
	},
	{ _id: false }
);

/* Category Schema */
const CategorySchema: Schema<Category> = new Schema(
	{
		group: String,
		order: Number,
		uid: { type: String, required: true, minlength: 5 },
		title: { type: String, required: true, minlength: 5 },
		subcategories: [SubCatSchema]
	},
	{ timestamps: true }
);

CategorySchema.pre('insertMany', function (next, docs) {
	docs.forEach((doc) => {
		doc.uid = WebUtils.slugify(doc.title);
		if (doc.subcategories.length > 0) {
			doc.subcategories.forEach((subcategory) => {
				subcategory.uid = WebUtils.slugify(subcategory.title);
			});
		}
		console.log('this.uid ' + doc.uid);
		console.log('this.subcategories ' + JSON.stringify(doc.subcategories));
	});
	next();
});

CategorySchema.index({ uid: 1 }, { unique: true });
CategorySchema.index({ order: 1, group: 1, title: 1 });

/* Link Model */
const Category: Model<Category> = model('category', CategorySchema);
Category.syncIndexes();

export { Category, CategorySchema };
