import { readdir, readFile, stat } from "fs";
import { promisify } from "util";
import { parse as parse_yaml } from "yaml";

export const read_directory = promisify(readdir);
export const read_file = promisify(readFile);
export const file_meta = promisify(stat);
export const read_yaml = async <T>(fname) => {
    const contents = await read_file(fname, {
        encoding: 'utf8'
    });
    return parse_yaml(contents, {

    }) as T;
};
