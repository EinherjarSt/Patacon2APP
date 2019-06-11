exports.protocol = "GPS103";
exports.model_name = "TK103";
exports.compatible_hardware = ["TK103/supplier"];

const Util = require('./util');
const util = new Util();
const parser = require('./parser');

var adapter = function (device) {
  if (!(this instanceof adapter)) return new adapter(device);

  this.device = device;

  /*******************************************
   *   PARSE THE INCOMING STRING FROM THE DECIVE 
   *   You must return an object with a least: device_id, cmd and action.
   *   Also you can add other parts.
   * 
   *   It will send to other functions has msg_parts.
   * 
   *   return device_id: The device_id (imei)
   *   return cmd: command from the device. if action is other it send cmd to try in that function
   *   return action: login_request, ping, alarm, other.
   * 
   *  Example of return:
   *  {
   *      device_id: xxxxxxxxxxxxxxx,
   *      cmd:    AB103,
   *      action: login_request,
   *      ...
   *  }
   ******************************************/
  this.parse_data = function (data) {
    let dataArray = parser.dataProcess(data);

    let msg_parts = {
      device_id: dataArray['imei'],
      cmd: dataArray['cmd'],
      rawData: dataArray['rawData']
    }
    switch (msg_parts.cmd) {
      case "login_request":
        msg_parts.action = "login_request";
        break;
      case "ping":
        msg_parts.action = "ping";
        break;
      case "alarm":
        msg_parts.action = "alarm";
        break;
      default:
        msg_parts.action = "other";
    }
    return msg_parts;
  }

  /**
   * Authorize the device to send data when is authorized by user.
   * Is called when you call device.login_authorized(true).
   */
  this.authorize = function () {
    this.send_command(null, "LOAD");
  }

  /** Required if your action is other
   *  Run other functions when action in parse_data return other.
   */
  this.run_other = function (cmd, msg_parts) {
    if (cmd === 'heartbeat'){
      this.send_command(null, "ON");
    }
    else if (cmd === 'do-nothing'){
      console.log("do-nothing adapter.tk103");
      console.log(msg_parts);
    }
  }

  /** Required if your action isn't request_login and you aren't still call this.login_authorized(true) in server callback;
   *  If action isn't login_request and the device are not login.
   */
  this.request_login_to_device = function () {
    //@TODO: Implement this.	
  }

  /** Required if your action is alarm
   * Is call when action is alarm.
   * 
   * return {code: xxxx, 
   *         ...
   *         } 
   * 
   * It is emit has alarmData.
   * 
   * You can listening subscribing to device
   * Ex: device.on('alarm', code, alarmData, msgParts)
   */
  this.receive_alarm = function (msg_parts) {}

  /** Required if your action is ping
   * Is call when action is ping. It method get the coordinates.
   * return gpsdata.
   * 
   * Ex: device.on('ping', gpsdata, msg_parts)
   */
  this.get_ping_data = function (msg_parts) {
    var gpsData = parser.getGPSData(msg_parts['rawData']);
    return gpsData;
  }

  /**
   * Send commands to device.
   * 
   * You can listening subscribing to device
   * Ex: device.on('send_data', gpsdata, msg_parts)
   */
  this.send_command = function (cmd, data) {
    var msg = data;
    this.device.send(msg);
  }

  /**
   * Format data to send device
   */
  this.format_data = function (params) {
    /* FORMAT THE DATA TO BE SENT */
  }

  /**
   * Is needed if you call device.set_refresh_time.
   * Send data to device
   * 
   * NOTE: The method recive interval and duration but because js hasn't types and is not validate the types
   * of interval or duration I will use one of this to pass the imei.
   */
  // this.set_refresh_time = function (interval, imei) {
  //   if(util.isEmpty || !util.isInt(interval)){
  //     throw new Error("Interval can't be empty and has to be a integer");
  //   }
  //   if(util.isEmpty || !util.isInt(imei)){
  //     throw new Error("Imei can't be empty and has to be a integer");
  //   }
  //   let msg = `**,imei:${imei},C,${interval}s`
  // }

  /**
   * Optional 
   * Change the status of device from loged to false.
   * Is called when you call device.logout();
   * 
   * return string with data formated
   */
  this.logout = function () {}
}
module.exports.adapter = adapter;