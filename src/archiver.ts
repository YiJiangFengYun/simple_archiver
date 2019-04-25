// require modules
import * as fs from 'fs';
import * as archiver from 'archiver';
import { log } from './logger';

export interface ArchiveInfo {
    src: string;
    output: string;
    format: archiver.Format;
    level: number;
}

export function archive(info: ArchiveInfo) {
    info.format = info.format || "zip";
    return new Promise<void>((resovle, reject) => {
        // create a file to stream archive data to.
        var output = fs.createWriteStream(info.output);

        var archive = archiver(info.format, info.format === "zip" ? {
            zlib: { level: info.level || 9 } // Sets the compression level when format is zip
        } : {}
        );
        
        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        output.on('close', function () {
            log.info(archive.pointer() + ' total bytes');
            log.info('archiver has been finalized and the output file descriptor has closed.');
            resovle();
        });
        
        // This event is fired when the data source is drained no matter what was the data source.
        // It is not part of this library but rather from the NodeJS Stream API.
        // @see: https://nodejs.org/api/stream.html#stream_event_end
        output.on('end', function () {
            log.info('Data has been drained');
        });
        
        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                // log warning
                log.warn(err.message);
            } else {
                log.error(err.message);
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
        log.info(`Started to pipe source data ${info.src} to output file ${info.output}`);
    });
}