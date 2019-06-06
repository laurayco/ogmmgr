// nodejs imports
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const fileStat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const fileExists = promisify(fs.exists);
const isFile = promisify(fs.readdir)

// project-local imports
import { ModeEntry, ModeIndex, AuthorInfo } from "./models";
import * as CONSTS from "./consts.json";
import * as utils from "./utils";

/*
    this file is the entry point to build the website.
*/

interface ModeData {
    filename: string;
    index: ModeIndex;
}

async function build_hinted_mode(
    root_dir: string,
    contributor_dir: string,
    mode_dir: string
) :
Promise<ModeData> {

    const mode_index_filename = path.parse(path.join(
        root_dir,
        contributor_dir,
        mode_dir,
        CONSTS.MODE_INDEX_FILENAME
    ));

    const returned_value : ModeData = {
        filename: path.format(mode_index_filename),
        index: {
            author: {
                contributor: contributor_dir
            },
            name: mode_dir,
            description: CONSTS.DEFAULT_DESCRIPTION_FILENAME,
            history: []
        }
    };

    const does_file_exist = await fileExists(returned_value.filename);
    if(does_file_exist) {
        // an existing entry already exists.
        // in this case we only update the
        // necessary information (do not
        // overwrite constant data. )
    }

    return returned_value;
}

async function get_game_modes(
    root_dir: string
):
Promise<ModeData[]> {
    const contributor_dirs = await utils.sub_directories(root_dir);

    const contributor_entries = await Promise.all(
        contributor_dirs.map(async contributor=>{
            const mode_dirs = await utils.sub_directories(path.join(root_dir, contributor));
            return Promise.all(mode_dirs.map(mdir=>build_hinted_mode(root_dir, contributor, mdir)));
        })
    );
    
    return utils.flatten(contributor_entries);
}

async function entry_point() {
    const root_dir = utils.actual_filename(CONSTS.ROOT_DIRECTORY);
    console.log(root_dir);
    const mode_data = await get_game_modes(root_dir);
    for(let mode of mode_data) {
        console.log(mode);
    }
}

entry_point();