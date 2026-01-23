import usersModel from "../../models/Users";

export default defineEventHandler(async (event) => {
	// return all users
  return await usersModel.find();

});