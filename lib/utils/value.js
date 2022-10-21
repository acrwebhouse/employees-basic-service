let uuid = require('node-uuid');
exports.isValid = function(value) {
    if (value != '' && value != undefined && value != null&& value) {
        return true;
    } else {
        return false;
    }
}

exports.isNumber = function isNumber(value) {
  return !Number.isNaN(Number(value))
}

exports.getUUID = function() {
   return parseInt(uuid.v4(), 16).toString();
}

exports.isTrueStr = function(value) {
    if(value == 'true'){
        return true;
    }else{
        return false;
    }
}