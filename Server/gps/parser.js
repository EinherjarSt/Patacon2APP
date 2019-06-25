/**
 * Created based in https://github.com/acner/jagertk10xtcp implementation of parser.
 */
const Util = require('./util'),
    moment = require('moment');

const util = new Util();

var parser = {
    dataProcess: function($message) {
        let $data = $message.toString().trim();
        console.log("-----------------------------parser----------------------------------");
        console.log($message);
        console.log($data);
        console.log("-----------------------------end parser----------------------------------");
        let regexpNumeros = new RegExp("^[0-9]{10,}$");
        if ($data.indexOf("imei", 0) === -1 && regexpNumeros.test($data.replace(";", "")) === false) {
        	console.log("Unknown error in parser");
            return;
        }
        let imei = this.getImei($data);
        let returnedObject = {imei};
        let dataArray = [];
        if (typeof($data) === 'string') {
            if ($data.length > 0) {
                dataArray = $data.split(',');
            }
        }

        if (dataArray.length === 1) {
            returnedObject['cmd'] = "heartbeat"
        }
        else if (dataArray && dataArray[2] === "A;") {
            returnedObject['cmd'] = "login_request"
        }
        else if (dataArray && dataArray[4] /*&& dataArray[4] === "L"*/) {
            returnedObject['cmd'] = "ping"
        }
        else{
            returnedObject['cmd']="do-nothing";
        }

        returnedObject['rawData'] = dataArray;

        return returnedObject
    },
    getImei: function($data) {
        if ($data.indexOf('imei:', 0) !== -1) {
            var $imei = (/imei\:([0-9]*)/).exec($data);
            if ($imei[1]) return $imei[1];
        } else {
            var $posibleimei = parseInt($data);
            if (util.isInt($posibleimei)) return $posibleimei;
        }
    },
    getGPSData: function(dataArray) {
        //Higienizacion dos dados
        dataArray[0] = util.clearInteger(dataArray[0]);
        dataArray[1] = util.clearLetter(dataArray[1]);
        dataArray[2] = util.clearInteger(dataArray[2]);
        //dataArray[3]  = dataArray[3];
        dataArray[4] = util.clearLetter(dataArray[4]);
        dataArray[5] = util.clearDecimal(dataArray[5]);
        dataArray[6] = util.clearLetter(dataArray[6]);
        dataArray[7] = util.clearDecimal(dataArray[7]);
        dataArray[8] = util.clearLetter(dataArray[8]);
        dataArray[9] = util.clearDecimal(dataArray[9]);
        dataArray[10] = util.clearLetter(dataArray[10]);
        dataArray[11] = util.clearDecimal(dataArray[11]);
        //Montar obj que sera retornado
        let $dataObject = {
            imei: dataArray[0],
            alert: dataArray[1],
            adminphone: dataArray[3],
            date: this.dateGPS(dataArray[2]),
            signal: dataArray[4],
            time: dataArray[5],
            latitude: this.getCoordinates(dataArray[8]) * this.pointConverter(parseFloat(dataArray[7])),
            longitude: this.getCoordinates(dataArray[10]) * this.pointConverter(parseFloat(dataArray[9])),
            velocity: parseInt(dataArray[11], 10) * 1.85,
            orientation:parseInt(dataArray[12], 10),
            received: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        return $dataObject;
    },
    getCoordinates: function(data) {
        return data === "S" || data === "W" ? -1 : 1;
    },
    pointConverter: function(data) {
        let wholeNumber = ~~(Math.round(data) / 100);
        let decimalPlace = (data - (wholeNumber * 100)) / 60;
        return (wholeNumber + decimalPlace).toFixed(6);
    },
    dateGPS: function(data) {
        if (!util.isset(data) || util.isEmpty(data)) {
            return '0000-00-00 00:00:00';
        }
        let $dt = moment().get('year') + data.substr(2, 10);
        console.log("date-parser:"+ data)
        let $year = $dt.substr(0, 4);
        let $month = $dt.substr(4, 2);
        let $day = $dt.substr(6, 2);
        let $hour = $dt.substr(8, 2);
        let $min = $dt.substr(10, 2);
        let $sec = $dt.substr(12, 2);
        let date = $year + '-' + $month + '-' + $day + ' ' + $hour + ':' + $min + ':' + $sec;
        if (moment(date).isValid()) return moment(date).format('YYYY-MM-DD HH:mm:ss');
        else return '0000-00-00 00:00:00';
    }
}
module.exports = parser;