import { Client } from "../client/Client";
import { PubSub } from "../pubsub/PubSub";
import { SnowletRequests } from "../snowlet/SnowletRequests";
import { SnowsightRequests } from "./SnowsightRequests";
/**
 * Snowsight client can make requests to Snowsight and must handle requests to Snowlet.
 */
export type SnowsightClient = Client<SnowsightRequests, SnowletRequests>;
export declare const createSnowsightClient: (pubsub: PubSub) => SnowsightClient;
