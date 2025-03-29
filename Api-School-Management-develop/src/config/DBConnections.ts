import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import initializeDatabase from "./DB";

let sequelize: Sequelize | undefined;

export const getSequelizeInstance = async (): Promise<Transaction> => {
  if (!sequelize) {
    await initializeDatabase();
    // Handle the case where sequelize is still undefined
    throw new Error("Failed to obtain a Sequelize instance.");
  }

  return sequelize.transaction();
};
