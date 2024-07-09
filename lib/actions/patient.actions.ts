/** @format */

"use server";

import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
	try {
		const newUser = await users.create(
			ID.unique(),
			user.email,
			user.phone,
			undefined,
			user.name
			// Add any other fields you need here (e.g., address, date_of_birth, etc.)
		);
		console.log({ newUser });

		return parseStringify(newUser);
	} catch (error: any) {
		if (error && error?.code === 409) {
			const document = await users.list([Query.equal("email", [user.email])]);

			return document?.users[0];
		}
	}
};
