const os = require('os');

module.exports.getBroadcastAddresses = () => {
  const broadcasts = [];
  const blacklist = [];

  const ifaces = os.networkInterfaces();
  for (const i of Object.keys(ifaces)) {
    const iface = ifaces[i];

    if (iface === undefined) {
      continue;
    }

    for (const ip of iface) {
      if (ip.family !== 'IPv4' || ip.internal) {
        continue;
      }

      const split = ip.address.split('.');

      split[3] = '255';

      broadcasts.push(split.join('.'));
      blacklist.push(ip.address);
    }
  }

  return [broadcasts, blacklist];
};

module.exports.shouldDumpAllPacketsRaw = () => {
  return process.argv.includes('--dump-all-packets-raw');
};

module.exports.shouldDumpRotationDataPacketsRaw = () => {
  return process.argv.includes('--dump-rotation-data-packets-raw');
};

module.exports.shouldDumpRotationDataPacketsProcessed = () => {
  return process.argv.includes('--dump-rotation-data-packets-processed');
};

module.exports.rotationDataPacketDumpFile = () => {
  const index = process.argv.indexOf('--rotation-data-packets-file');
  if (index === -1) {
    return '';
  }

  return process.argv[index + 1];
};

module.exports.shouldDumpFusedDataRaw = () => {
  return process.argv.includes('--dump-fused-imu-data-raw');
};

module.exports.shouldDumpFusedDataProcessed = () => {
  return process.argv.includes('--dump-fused-imu-data-processed');
};

module.exports.fusedIMUDataDumpFile = () => {
  const index = process.argv.indexOf('--fused-imu-data-file');
  if (index === -1) {
    return '';
  }

  return process.argv[index + 1];
};

module.exports.shouldDumpRawIMUDataRaw = () => {
  return process.argv.includes('--dump-raw-imu-data-raw');
};

module.exports.shouldDumpRawIMUDataProcessed = () => {
  return process.argv.includes('--dump-raw-imu-data-processed');
};

module.exports.rawIMUDataDumpFile = () => {
  const index = process.argv.indexOf('--raw-imu-data-file');
  if (index === -1) {
    return '';
  }

  return process.argv[index + 1];
};

module.exports.shouldDumpCorrectionDataRaw = () => {
  return process.argv.includes('--dump-correction-data-raw');
};

module.exports.shouldDumpCorrectionDataProcessed = () => {
  return process.argv.includes('--dump-correction-data-processed');
};

module.exports.correctionDataDumpFile = () => {
  const index = process.argv.indexOf('--correction-data-file');
  if (index === -1) {
    return '';
  }

  return process.argv[index + 1];
};

/**
 * @param {number} mac
 * @returns {string}
 */
module.exports.formatMACAddressDigit = (mac) => {
  return mac.toString(16).padStart(2, '0').toUpperCase();
};
