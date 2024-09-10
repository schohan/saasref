import Mongoose from 'mongoose';
const { Schema, model } = Mongoose;

export const listType = {
	candidate: 'candidate',
	project: 'project',
	get enum() {
		return [this.candidate, this.project];
	}
};

const ListSchema = new Schema(
	{
		owner: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 24
		},
		name: {
			type: String,
			required: true,
			minlength: 1
		},
		listType: {
			type: String,
			enum: listType.enum
		},
		items: [
			{
				type: String,
				minlength: 1,
				maxlength: 100
			}
		]
	},
	{ timestamps: true }
);

ListSchema.index({ owner: 1, name: 1 });

export const List = model('list', ListSchema);
