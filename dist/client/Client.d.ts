import { PubSub } from "../pubsub/PubSub";
import { Requests } from "./Requests";
export type HandlerRemover = () => void;
export type Handler<F extends Requests> = (functionName: keyof F, handler: F[typeof functionName]) => HandlerRemover;
/**
 * Type F represents the Requests the client can make.
 * Type H represents the Requests the client has to handle.
 */
export type Client<F extends Requests, H extends Requests> = F & {
    setHandler: <K extends keyof H>(functionName: K, handler: H[K]) => HandlerRemover;
};
export interface ClientConfig<F extends Requests> {
    caller: string;
    pubsub: PubSub;
    functionNames: {
        [k in keyof F]: true;
    };
    onLog?: (...args: any[]) => void;
}
export declare const createClient: <F extends Requests, H extends Requests>({ caller, pubsub, functionNames, onLog, }: ClientConfig<F>) => Client<F, H>;
