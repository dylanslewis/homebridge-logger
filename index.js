// Dependancies
var fs = require('fs');
var os = require('os');

// Variables
var valueSeparator = ', ';
var printConsoleLogs = true;

// Public
exports.logCharacteristicUpdateForDevice = function logCharacteristicUpdateForDevice(device, characteristic, value) {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
  const output = `time=${time}${valueSeparator}name=${device}${valueSeparator}characteristic=${characteristic}${valueSeparator}value=${value}\n`;

  logOutput(output);
}

exports.setValueSeparator = function setValueSeparator(separator) {
  valueSeparator = separator;
}

exports.setPrintConsoleLogs = function setPrintConsoleLogs(print) {
  printConsoleLogs = print;
}

// Private
function logOutput(output) {
  if (printConsoleLogs == true) {
    console.log(`Logging: ${output}`);
  }

  const now = new Date();
  const date = `${now.getDate()}-${now.getMonth()}-${now.getYear()}`;
  const path = `${os.homedir()}/.homebridge/logs/${date}characteristic_updates.log`;

  fs.exists(path, function(exists) {
    if (exists) {
      // File exists, append output.
      fs.appendFile(path, output, function (error) {
        if (error) {
          print(console.log(error));
        }
      });
    } else {
      // File doesn't exist, create it with the output.
      fs.writeFile(path, output, function (error) {
        if (error) {
          print(console.log(error));
        }
      });
    }
  });
}
