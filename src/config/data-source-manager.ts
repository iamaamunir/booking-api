// src/config/data-source-manager.ts
import { AppDataSource } from "./data-source";
import { TestDataSource } from "./test-data-source";
import { DataSource } from "typeorm";

let activeDataSource: DataSource;

export const getDataSource = (): DataSource => {
  if (!activeDataSource) {
    activeDataSource =
      process.env.NODE_ENV === "test" ? TestDataSource : AppDataSource;
  }
  return activeDataSource;
};

export const initDataSource = async () => {
  const ds = getDataSource();
  if (!ds.isInitialized) {
    await ds.initialize();
  }
  return ds;
};

export const closeDataSource = async () => {
  const ds = getDataSource();
  if (ds.isInitialized) {
    await ds.destroy();
  }
};
