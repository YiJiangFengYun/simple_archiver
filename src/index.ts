// require modules
import { init } from "./init";

import * as archiver from "./archiver";

export function archive(info: archiver.ArchiveInfo) {
    return init()
    .then(() => {
        return archiver.archive(info);
    });
}

