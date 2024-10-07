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
  const meta = document.createElement('meta');
  meta.httpEquiv = "Content-Security-Policy";
  meta.content = `default-src ${window.location.origin}; style-src ${window.location.origin} 'unsafe-inline'; script-src ${window.location.origin} 'unsafe-inline'; connect-src ${window.location.origin} ws://${window.location.host}/ws; frame-src 'none';`
  document.head.append(meta)
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
