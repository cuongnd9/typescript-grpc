/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal';


export interface HelloRequest {
  name: string;
}

export interface HelloReply {
  message: string;
}

const baseHelloRequest: object = {
  name: "",
};

const baseHelloReply: object = {
  message: "",
};

export interface Greeter {

  SayHello(request: HelloRequest): Promise<HelloReply>;

  SayHi(request: HelloRequest): Promise<HelloReply>;

}

export class GreeterClientImpl implements Greeter {

  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  SayHello(request: HelloRequest): Promise<HelloReply> {
    const data = HelloRequest.encode(request).finish();
    const promise = this.rpc.request("helloworld.Greeter", "SayHello", data);
    return promise.then(data => HelloReply.decode(new Reader(data)));
  }

  SayHi(request: HelloRequest): Promise<HelloReply> {
    const data = HelloRequest.encode(request).finish();
    const promise = this.rpc.request("helloworld.Greeter", "SayHi", data);
    return promise.then(data => HelloReply.decode(new Reader(data)));
  }

}

interface Rpc {

  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;

}

export const HelloRequest = {
  encode(message: HelloRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): HelloRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseHelloRequest } as HelloRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): HelloRequest {
    const message = { ...baseHelloRequest } as HelloRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<HelloRequest>): HelloRequest {
    const message = { ...baseHelloRequest } as HelloRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
  toJSON(message: HelloRequest): unknown {
    const obj: any = {};
    obj.name = message.name || "";
    return obj;
  },
};

export const HelloReply = {
  encode(message: HelloReply, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.message);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): HelloReply {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseHelloReply } as HelloReply;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): HelloReply {
    const message = { ...baseHelloReply } as HelloReply;
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<HelloReply>): HelloReply {
    const message = { ...baseHelloReply } as HelloReply;
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    return message;
  },
  toJSON(message: HelloReply): unknown {
    const obj: any = {};
    obj.message = message.message || "";
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;