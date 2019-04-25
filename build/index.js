"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// require modules
var fsExtra = require("fs-extra");
var path = require("path");
var init_1 = require("./init");
var archiver = require("./archiver");
function archive(info) {
    return init_1.init()
        .then(function () {
        //Ensure the directory of output existing
        return fsExtra.ensureDir(path.dirname(info.output));
    })
        .then(function () {
        return archiver.archive(info);
    });
}
exports.archive = archive;
//# sourceMappingURL=index.js.map