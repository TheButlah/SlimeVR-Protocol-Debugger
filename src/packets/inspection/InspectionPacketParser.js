const constants = require('./constants');
const IncomingFusedIMUDataPacket = require('./IncomingFusedIMUDataPacket');
const IncomingCorrectionDataPacket = require('./IncomingCorrectionDataPacket');
const IncomingRawIMUDataPacket = require('./IncomingRawIMUDataPacket');

module.exports = class InspectionPacketParser {
  /**
   * @param {Buffer} data
   */
  static parseRawDataPacket = (data) => {
    const packetType = data.readUInt8(0);

    data = data.slice(1);

    switch (packetType) {
      case constants.packetType.raw:
        return new IncomingRawIMUDataPacket(data);

      case constants.packetType.fused:
        return new IncomingFusedIMUDataPacket(data);

      case constants.packetType.correction:
        return new IncomingCorrectionDataPacket(data);

      default:
      // console.log(`Unknown packet type: ${packetType}`);
    }

    return null;
  };

  static get type() {
    return 0x69;
  }
};
