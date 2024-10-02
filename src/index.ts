import { createSnowletPubSub } from "./pubsub/SnowletPubSub";
import { createSnowsightPubSub } from "./pubsub/SnowsightPubSub";
import * as SnowsightClient from "./snowlet/SnowletClient";
import { createSnowsightClient } from "./snowsight/SnowsightClient";

export interface SnowletClientConfig {
  snowletId: string;
  iframe: HTMLIFrameElement;
}

export const createSnowletClient = ({ snowletId, iframe }: SnowletClientConfig) => (
  SnowsightClient.createSnowletClient(
    createSnowletPubSub({
      channelId: snowletId,
      iframe,
    })
  )
);

export const snowsightClient = createSnowsightClient(
  createSnowsightPubSub({
    channelId: (window as any).snowletId,
  })
);

export { SnowletClient } from './snowlet/SnowletClient';
export { SnowletRequests } from './snowlet/SnowletRequests';
export * from './snowsight/SnowsightClient';
export * from './snowsight/SnowsightRequests';
