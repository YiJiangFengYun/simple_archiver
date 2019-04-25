import * as archiver from 'archiver';
export interface ArchiveInfo {
    src: string;
    output: string;
    format: archiver.Format;
    level: number;
}
export declare function archive(info: ArchiveInfo): Promise<void>;
