import { Client } from "../client/Client";
import { SnowletRequests } from "./SnowletRequests";
import { SnowsightRequests } from "../snowsight/SnowsightRequests";
import { PubSub } from "../pubsub/PubSub";
/**
 * Snowlet client can make requests to Snowlet and must handle requests to Snowsight.
 */
export type SnowletClient = Client<SnowletRequests, SnowsightRequests>;
export declare const createSnowletClient: (pubsub: PubSub) => SnowletClient;
