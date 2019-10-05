import { read_directory, read_file, read_yaml, file_meta, read_text_file } from "./utils";
import { join, parse } from "path";
import CONFIG from "../config";
import { ModeEntry } from "../models/mode";

const load_mode_entries = async (author: string, slug: string) => {
    const data_directory = await CONFIG.data_directory;
    const mode_dname = join(data_directory, "modes", author, slug);
    const filenames = await read_directory(mode_dname, {withFileTypes: true});
    const gmfiles = filenames.filter(fn=>fn.isFile&&fn.name.endsWith("owgm")).map(fn=>join(mode_dname, fn.name));
    const results = await Promise.all(gmfiles.map(async fn=>({
        fn,
        stats: await file_meta(fn)
    })));
    results.sort((a,b)=>a.stats.mtime.getTime()-b.stats.mtime.getTime());
    return Promise.all(results.map(async entry_file_info=>{
        const { fn, stats } = entry_file_info;
        const parsed_fn = parse(fn);
        const share_code = parsed_fn.name;
        const published = stats.mtime.toISOString();
        const code = await read_text_file(fn);
        return { share_code, code, published } as ModeEntry;
    }));
}

const load_mode_description = async (author: string, slug: string) => {
    const data_directory = await CONFIG.data_directory;
    const mode_dname = join(data_directory, "modes", author, slug);
    const mode_desc_fn = join(mode_dname, "description.md");
    
};