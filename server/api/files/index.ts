import filesModel from '../../models/Files'

export default defineEventHandler(async (event) => {
	let res = await filesModel.find();

	return res;
});