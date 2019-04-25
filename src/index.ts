// require modules
import * as fsExtra from "fs-extra";
import * as path from "path";
import { init } from "./init";
import * as archiver from "./archiver";

export function archive(info: archiver.ArchiveInfo) {
    return init()
    .then(() => {
        //Ensure the directory of output existing
        return fsExtra.ensureDir(path.dirname(info.output));
    })
    .then(() => {
        return archiver.archive(info);
    });
}

