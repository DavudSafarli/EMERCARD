import { ContainerState } from "./enums/ContainerState"

export interface Container {
  Id: string,
  Image: string,
  Names: Array<string>,
  Ports: Array<Port>,
  State: ContainerState,
  Command: string,
  Status: string,
  Created: number,
}

export type ContainerBriefInfo = {
  name: string,
  image: string,
  ports?: Array<Port>,
  state: ContainerState,
  status: string,
}

type Port = {
  IP: string,
  PrivatePort: number,
  PublicPort: number,
  Type: string,
}