import { Client } from "./Client";
import { PubSub } from "../pubsub/PubSub";
import { NativeAppRequests } from "./NativeAppRequests";
import { SnowflakeRequests } from "./SnowflakeRequests";
/**
 * Snowsight client can make requests to Snowsight and must handle requests to Snowlet.
 */
export type SnowflakeClient = Client<SnowflakeRequests, NativeAppRequests>;
export declare const createSnowflakeClient: (pubsub: PubSub) => SnowflakeClient;
