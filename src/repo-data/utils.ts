import { readdir, readFile, stat } from "fs";
import { promisify } from "util";
import { parse as parse_yaml } from "yaml";

export const read_directory = promisify(readdir);
export const read_file = promisify(readFile);
export const read_text_file = (fn: string|number|Buffer|URL, opts?: {
    encoding?: string,
    flag?: string
})=>read_file(fn, Object.assign({
    encoding: "utf8"
}, opts));

export const file_meta = promisify(stat);
export const read_yaml = async <T>(fname) => {
    const contents = await read_file(fname, {
        encoding: 'utf8'
    });
    return parse_yaml(contents, {

    }) as T;
};
