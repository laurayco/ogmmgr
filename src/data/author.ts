import { AuthorInformation } from "../models/author";
import { join, parse } from "path";
import CONFIG from "../config";
import { read_yaml, read_directory } from "./utils";
import { AuthorIndex } from "../models/author_index";

const load_author = async (author_name: string)=> {
    const data_directory = await CONFIG.data_directory;
    const author_meta_fn = join(data_directory, author_name, "index.yml");
    const returned : AuthorInformation = {
        contributor: author_name
    };

    try {
        const meta = await read_yaml(author_meta_fn);

        if(typeof meta["battlenet_name"]==="string") {
            returned.battlenet_name = [ meta["battlenet_name"] ];
        } else if(Array.isArray(meta["battlenet_name"])) {
            returned.battlenet_name = meta["battlenet_name"];
        }
    } catch(ex) {
        // do nothing for now.
    }

    return returned;
};

const load_author_index = async (author_name: string)=>{
    const data_directory = await CONFIG.data_directory;
    const author = await load_author(author_name);
    const author_mode_dir = join(data_directory, author_name);
    const author_files = await read_directory(author_mode_dir);
    const entry_slugs = author_files
        .filter(fn=>fn!=="index.yml")
        .map(fn=>parse(fn).name);
    return {
        author,
        modes: entry_slugs
    } as AuthorIndex;
};

export default load_author_index;