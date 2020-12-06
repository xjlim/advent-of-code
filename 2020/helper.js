const fs = require("fs");
const path = require("path");

module.exports.getInput = function (day, file) {
    let text = fs.readFileSync(
        path.resolve(__dirname, `${day}/${file}.txt`),
        "utf-8"
    );
    return text.split("\n");
};
