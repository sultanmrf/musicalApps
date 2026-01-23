import mongoose, { isValidObjectId } from "mongoose";
import { number } from "yup";



// author schema
const schema: mongoose.Schema = new mongoose.Schema(
	{
		fileName: {
			type: String,
			require: true,
		},
		path: {
			type: String,
			require: true
		},
		type: {
			type: String,
			require: true
		},
		size: {
			type: String,
			require: false
		},
		status: {
            type: String,
			require: true
		},
		context: {
			type: String,
			require: false
		},
		poster: {
			type: String,
			require: false
		},
		loves: Array
       
	},
);

// author model
export default mongoose.model("Files", schema);