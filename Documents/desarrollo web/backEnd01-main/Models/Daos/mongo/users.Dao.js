// FUERA DE SERVICIO
import bcrypt from "bcrypt";
import { usersSchema } from "./usersModel.js";
function cryptPass(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function comparePass(password, hash) {
  return bcrypt.compareSync(password, hash);
}

const findName = async (username) => {
  const existingUser = await usersSchema.findOne({ username });
  return existingUser;
};
const createUser = async (newUser) => {
  const createdUser = await usersSchema.create(newUser);
  return createdUser;
};

export { findName, createUser, comparePass, cryptPass };
