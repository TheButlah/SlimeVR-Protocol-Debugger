// @ts-check

const udp = require('node:dgram');
const ConnectionTracker = require('./ConnectionTracker');
const Tracker = require('./Tracker');
const utils = require('./utils');

const [_, addressBlacklist] = utils.getBroadcastAddresses();

const server = udp.createSocket('udp4');
const connectionTracker = ConnectionTracker.get(server);

server.on('connect', () => {
  console.log('connected');
});

server.on('close', () => {
  console.log('closed');
});

server.on('error', (err) => {
  console.log('error', err);
});

server.on('listening', () => {
  console.log('listening');
});

server.on('message', (msg, rinfo) => {
  if (addressBlacklist.includes(rinfo.address)) {
    return;
  }

  let tracker = connectionTracker.getConnectionByIP(rinfo.address);

  if (!tracker) {
    tracker = new Tracker(server, rinfo.address, rinfo.port);
    connectionTracker.addConnection(tracker);
  }

  tracker.handle(msg);
});

setInterval(() => connectionTracker.removeOldConnections(), 500).unref();
setInterval(() => connectionTracker.pingConnections(), 1000).unref();

server.bind(6969, '0.0.0.0');
