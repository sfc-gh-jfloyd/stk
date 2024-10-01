import { createApis } from "./createApis";

const { createClient } = createApis();
const client = createClient();
const getSnowletClient = () => client;

export {
  getSnowletClient,
};

export * from './SnowletClient';
