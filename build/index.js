"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// require modules
var init_1 = require("./init");
var archiver = require("./archiver");
function archive(info) {
    return init_1.init()
        .then(function () {
        return archiver.archive(info);
    });
}
exports.archive = archive;
//# sourceMappingURL=index.js.map