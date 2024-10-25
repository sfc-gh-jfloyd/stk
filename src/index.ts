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

const snowletId = (window as any).snowletId || new URLSearchParams(window.location.search).get("snowletId");

if (snowletId) {
  console.log({snowletId});
  const meta = document.createElement('meta');
  meta.httpEquiv = "Content-Security-Policy";
  meta.content = `default-src 'none'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'self'; form-action 'none';`
  document.head.append(meta);
}

export const snowsightClient = createSnowsightClient(
  createSnowsightPubSub({
    channelId: snowletId,
  })
);

export { SnowletClient } from './snowlet/SnowletClient';
export { SnowletRequests } from './snowlet/SnowletRequests';
export * from './snowsight/SnowsightClient';
export * from './snowsight/SnowsightRequests';
