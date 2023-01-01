// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var driver_pb = require('./driver_pb.js');

function serialize_driver_DeviceList(arg) {
  if (!(arg instanceof driver_pb.DeviceList)) {
    throw new Error('Expected argument of type driver.DeviceList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_driver_DeviceList(buffer_arg) {
  return driver_pb.DeviceList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_driver_Empty(arg) {
  if (!(arg instanceof driver_pb.Empty)) {
    throw new Error('Expected argument of type driver.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_driver_Empty(buffer_arg) {
  return driver_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_driver_ReadMsg(arg) {
  if (!(arg instanceof driver_pb.ReadMsg)) {
    throw new Error('Expected argument of type driver.ReadMsg');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_driver_ReadMsg(buffer_arg) {
  return driver_pb.ReadMsg.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_driver_ResRead(arg) {
  if (!(arg instanceof driver_pb.ResRead)) {
    throw new Error('Expected argument of type driver.ResRead');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_driver_ResRead(buffer_arg) {
  return driver_pb.ResRead.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_driver_ResSend(arg) {
  if (!(arg instanceof driver_pb.ResSend)) {
    throw new Error('Expected argument of type driver.ResSend');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_driver_ResSend(buffer_arg) {
  return driver_pb.ResSend.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_driver_SendMsg(arg) {
  if (!(arg instanceof driver_pb.SendMsg)) {
    throw new Error('Expected argument of type driver.SendMsg');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_driver_SendMsg(buffer_arg) {
  return driver_pb.SendMsg.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_driver_SetLight(arg) {
  if (!(arg instanceof driver_pb.SetLight)) {
    throw new Error('Expected argument of type driver.SetLight');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_driver_SetLight(buffer_arg) {
  return driver_pb.SetLight.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_driver_SystemInfo(arg) {
  if (!(arg instanceof driver_pb.SystemInfo)) {
    throw new Error('Expected argument of type driver.SystemInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_driver_SystemInfo(buffer_arg) {
  return driver_pb.SystemInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_driver_VenderMsg(arg) {
  if (!(arg instanceof driver_pb.VenderMsg)) {
    throw new Error('Expected argument of type driver.VenderMsg');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_driver_VenderMsg(buffer_arg) {
  return driver_pb.VenderMsg.deserializeBinary(new Uint8Array(buffer_arg));
}


var DriverGrpcService = exports.DriverGrpcService = {
  watchDevList: {
    path: '/driver.DriverGrpc/watchDevList',
    requestStream: false,
    responseStream: true,
    requestType: driver_pb.Empty,
    responseType: driver_pb.DeviceList,
    requestSerialize: serialize_driver_Empty,
    requestDeserialize: deserialize_driver_Empty,
    responseSerialize: serialize_driver_DeviceList,
    responseDeserialize: deserialize_driver_DeviceList,
  },
  watchVender: {
    path: '/driver.DriverGrpc/watchVender',
    requestStream: false,
    responseStream: true,
    requestType: driver_pb.Empty,
    responseType: driver_pb.VenderMsg,
    requestSerialize: serialize_driver_Empty,
    requestDeserialize: deserialize_driver_Empty,
    responseSerialize: serialize_driver_VenderMsg,
    responseDeserialize: deserialize_driver_VenderMsg,
  },
  watchSystemInfo: {
    path: '/driver.DriverGrpc/watchSystemInfo',
    requestStream: false,
    responseStream: true,
    requestType: driver_pb.Empty,
    responseType: driver_pb.SystemInfo,
    requestSerialize: serialize_driver_Empty,
    requestDeserialize: deserialize_driver_Empty,
    responseSerialize: serialize_driver_SystemInfo,
    responseDeserialize: deserialize_driver_SystemInfo,
  },
  sendMsg: {
    path: '/driver.DriverGrpc/sendMsg',
    requestStream: false,
    responseStream: false,
    requestType: driver_pb.SendMsg,
    responseType: driver_pb.ResSend,
    requestSerialize: serialize_driver_SendMsg,
    requestDeserialize: deserialize_driver_SendMsg,
    responseSerialize: serialize_driver_ResSend,
    responseDeserialize: deserialize_driver_ResSend,
  },
  readMsg: {
    path: '/driver.DriverGrpc/readMsg',
    requestStream: false,
    responseStream: false,
    requestType: driver_pb.ReadMsg,
    responseType: driver_pb.ResRead,
    requestSerialize: serialize_driver_ReadMsg,
    requestDeserialize: deserialize_driver_ReadMsg,
    responseSerialize: serialize_driver_ResRead,
    responseDeserialize: deserialize_driver_ResRead,
  },
  sendRawFeature: {
    path: '/driver.DriverGrpc/sendRawFeature',
    requestStream: false,
    responseStream: false,
    requestType: driver_pb.SendMsg,
    responseType: driver_pb.ResSend,
    requestSerialize: serialize_driver_SendMsg,
    requestDeserialize: deserialize_driver_SendMsg,
    responseSerialize: serialize_driver_ResSend,
    responseDeserialize: deserialize_driver_ResSend,
  },
  readRawFeature: {
    path: '/driver.DriverGrpc/readRawFeature',
    requestStream: false,
    responseStream: false,
    requestType: driver_pb.ReadMsg,
    responseType: driver_pb.ResRead,
    requestSerialize: serialize_driver_ReadMsg,
    requestDeserialize: deserialize_driver_ReadMsg,
    responseSerialize: serialize_driver_ResRead,
    responseDeserialize: deserialize_driver_ResRead,
  },
  setLightType: {
    path: '/driver.DriverGrpc/setLightType',
    requestStream: false,
    responseStream: false,
    requestType: driver_pb.SetLight,
    responseType: driver_pb.Empty,
    requestSerialize: serialize_driver_SetLight,
    requestDeserialize: deserialize_driver_SetLight,
    responseSerialize: serialize_driver_Empty,
    responseDeserialize: deserialize_driver_Empty,
  },
};

exports.DriverGrpcClient = grpc.makeGenericClientConstructor(DriverGrpcService);
