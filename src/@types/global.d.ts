import { Containers } from ".";
import { Message } from "./events";

// export something to make it module
export {}
declare global {
  const __static: string
  interface ElectronPreloadAPI {
    Container: ContainerInterface;
    Events: EventInterface;
  }

  interface Window {
    api: ElectronPreloadAPI
  }  

  interface String {
    in: (arr: Array<string>) => boolean;
  }

}

export interface ContainerInterface {
  List: () => Promise<Containers>;
  Start: (id: string) => Promise<boolean>;
  Stop: (id: string) => Promise<boolean>;
  Bash: (id: string) => Promise<boolean>;
  Remove: (id: string) => Promise<boolean>;
  Logs: (id: string) => Promise<string>;
}

export interface EventInterface {
  RegisterEventListener: (listener: (chunk: Message) => void) => void;
  UnregisterEventListener: () => void;

}