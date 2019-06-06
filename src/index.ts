// nodejs imports
import * as path from "path";

// npm imports
import * as yaml from "yaml";
import * as PropTypes from "prop-types";
import * as checkPropTypes from 'check-prop-types';


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
    console.log(root_dir);
    const mode_data = await get_game_modes(root_dir);
    for(let mode of mode_data) {
        console.log(mode);
    }

    console.log("CHECKING PROP TYPE");
    const result = checkPropTypes({
        filename: ModelPropTypes.REPO_FILENAME
        }, {
            filename: "",
        },
        "prop",
        "SimpleDataConstruct"
    );
    if(result!==undefined) {
        console.log(result);
    } else {
        console.log("ALL GOOD");
    }
}

entry_point();