"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// require modules
var fs = require("fs");
var archiver = require("archiver");
var logger_1 = require("./logger");
function archive(info) {
    info.format = info.format || "zip";
    return new Promise(function (resovle, reject) {
        // create a file to stream archive data to.
        var output = fs.createWriteStream(info.output);
        var archive = archiver(info.format, info.format === "zip" ? {
            zlib: { level: info.level || 9 } // Sets the compression level when format is zip
        } : {});
        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        output.on('close', function () {
            logger_1.log.info(archive.pointer() + ' total bytes');
            logger_1.log.info('archiver has been finalized and the output file descriptor has closed.');
            resovle();
        });
        // This event is fired when the data source is drained no matter what was the data source.
        // It is not part of this library but rather from the NodeJS Stream API.
        // @see: https://nodejs.org/api/stream.html#stream_event_end
        output.on('end', function () {
            logger_1.log.info('Data has been drained');
        });
        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                // log warning
                logger_1.log.warn(err.message);
            }
            else {
                logger_1.log.error(err.message);
                reject(err);
            }
        });
        // good practice to catch this error explicitly
        archive.on('error', function (err) {
            reject(err);
        });
        // pipe archive data to the file
        archive.pipe(output);
        // append files from a sub-directory, putting its contents at the root of archive
        archive.directory(info.src, false);
        // finalize the archive (ie we are done appending files but streams have to finish yet)
        // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
        archive.finalize();
        logger_1.log.info("Started to pipe source data " + info.src + " to output file " + info.output);
    });
}
exports.archive = archive;
