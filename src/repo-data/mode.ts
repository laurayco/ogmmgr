import { read_directory, read_file, read_yaml, file_meta, read_text_file } from "./utils";
import { join, parse } from "path";
import CONFIG from "../config";

import { ModeIndex } from "../models/mode_index";
import { ModeEntry } from "../models";

const load_mode = async (author: string, slug: string) => {
    const data_directory = await CONFIG.data_directory;
    const mode_dname = join(data_directory, author, `${slug}.yml`);
    const mode_entry = await read_yaml(mode_dname);
    const current_ts = (new Date()).toISOString();
    const history = Object.keys(mode_entry["codes"]).map(share_code=>{
        return {
            code: mode_entry["codes"][share_code]["script"] || null,
            published: mode_entry["codes"][share_code]["published"] || current_ts,
            share_code
        } as ModeEntry;
    });
    const mi : ModeIndex = {
        author,
        description: mode_entry["description"] || `#${slug}`,
        history,
        name: mode_entry["name"] || slug,
        preview_image: mode_entry["image"] || null,
        preview_video: mode_entry["video"] || null
    }
    return mi as ModeIndex;
}

export default load_mode;