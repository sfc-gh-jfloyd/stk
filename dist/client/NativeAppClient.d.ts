import { Client } from "./Client";
import { NativeAppRequests } from "./NativeAppRequests";
import { SnowflakeRequests } from "./SnowflakeRequests";
import { PubSub } from "../pubsub/PubSub";
/**
 * Native app client can make requests to the native app and must handle requests from Snowflake.
 */
export type NativeAppClient = Client<NativeAppRequests, SnowflakeRequests>;
export declare const createNativeAppClient: (pubsub: PubSub) => NativeAppClient;
