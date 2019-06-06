// nodejs imports
import * as path from "path";

// npm imports
import * as yaml from "yaml";

// project-local imports
import models, {
    ModeEntry,
    ModeIndex,
    AuthorInfo,
    PropTypes as ModelPropTypes
} from "./models";

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

    // create index container.
    const does_file_exist = await utils.fileExists(returned_value.filename);
    if(does_file_exist) {
        // an existing entry already exists.
        // in this case we only update the
        // necessary information (do not
        // overwrite constant data. )
        const file_contents = await utils.readFile(returned_value.filename);
        try {
            const file_value = yaml.parse(file_contents.toString('utf8'));
            if(!Array.isArray(file_value)&&typeof file_value==="object") {
                // we know it's an object and not an array
                // (ie: not a number, null, or string value)
                Object.assign(returned_value.index, file_value);
            } else {
                console.warn(`Invalid value for ${returned_value.filename}:`, file_value);
            }
        } catch (ex) {
            console.warn(`Error parsing YAML for ${returned_value.filename}:`,ex);
        }
    }

    const ignored_files = ["index.yml", "description.md"];
    const ignored_extensions = [".yml", ".md"];
    // build entries from files in directory.
    // filename should be: <GAME CODE>.owgm
    const mode_files = (await utils.directory_files(path.join(root_dir,contributor_dir,mode_dir))).map(fname=>{
        return path.parse(path.join(root_dir, contributor_dir, mode_dir,fname));
    }).filter(fname=>!(ignored_files.includes(fname.base)||ignored_extensions.includes(fname.ext)));

    returned_value.index.history = await Promise.all(mode_files.map(async fname=>{
        const share_code = fname.name;
        const stat = await utils.fileStat(path.format(fname));
        const published = stat.mtime;
        return {
            share_code,
            published: published.toUTCString()
        };
    }));

    returned_value.index.history.sort((a,b)=>{
        const adate = new Date(a.published);
        const bdate = new Date(b.published);
        if(adate>bdate) {
            return 1;
        } if(bdate>adate) {
            return -1;
        } {
            return 0;
        }
    });

    // write the new index to the file.
    await utils.writeFile(returned_value.filename, yaml.stringify(returned_value.index));

    return returned_value;
}

async function get_game_modes(
    root_dir: string
):
Promise<ModeData[]> {
    const contributor_dirs = await utils.sub_directories(root_dir);

    const contributor_entries = await Promise.all(
        contributor_dirs.map(async contributor=>{
            const mode_dirs = await utils.sub_directories(path.join(
                root_dir,
                contributor
            ));
            return Promise.all(mode_dirs.map(mdir=>build_hinted_mode(
                root_dir,
                contributor,
                mdir
            )));
        })
    );
    
    return utils.flatten(contributor_entries);
}

async function entry_point() {
    const root_dir = utils.actual_filename(CONSTS.ROOT_DIRECTORY);
    const mode_data = await get_game_modes(root_dir);
    for(let mode of mode_data) {
        console.log(yaml.stringify(mode.index));
    }
}

entry_point();