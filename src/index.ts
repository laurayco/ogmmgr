// nodejs imports
import * as path from "path";

// npm imports
import * as yaml from "yaml";
import * as pug from "pug";

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

interface UserMeta {
    author: AuthorInfo;
    game_modes: ModeIndex[];
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
        const published = stat.ctime;
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

const page_template = pug.compileFile(utils.actual_filename("./src/templates/page.pug"));
const infer_human_name = (content: string)=>content.
    replace(/[_ ]+/g," ").
    split(" ").
    map(chunk=>`${chunk.slice(0,1).toLocaleUpperCase()}${chunk.slice(1).toLocaleLowerCase()}`).
    join(" ");

async function render_page_file(filename: string) {
    const page_source_name = path.parse(filename);
    const page_name = infer_human_name(page_source_name.name);
    const file_contents = await utils.readFile(path.join(utils.actual_filename("./src/pages"),filename));
    const markdown_result = await utils.marked(file_contents.toString('utf-8'), CONSTS.MARKDOWN_OPTIONS);
    const html_filename = `${page_source_name.name}.html`;
    const html_content = page_template({
        name: page_name,
        content: markdown_result,
        path: `/page/${html_filename}`,
        root_url: CONSTS.ROOT_URL
    });
    await utils.writeFile(path.join(utils.actual_filename(CONSTS.HTML_OUTPUT_DIRECTORY),"page",html_filename), html_content);
}

async function render_static_pages() {
    const page_files = await utils.directory_files(utils.actual_filename("./src/pages"));
    await Promise.all(page_files.map(render_page_file));
    const index_content = await utils.marked(
        (await utils.readFile(
            path.join(utils.actual_filename("./src/pages/home.md"))
        )).toString('utf-8'),
        CONSTS.MARKDOWN_OPTIONS
    );
    const index_html = page_template({
        name: "Home",
        content: index_content,
        path: `/`,
        root_url: CONSTS.ROOT_URL
    });
    await utils.writeFile(path.join(utils.actual_filename(CONSTS.HTML_OUTPUT_DIRECTORY),"index.html"), index_html);
}

async function render_user_pages(modes: ModeData[]) {

}

async function render_mode_pages(modes: ModeData[]) {

}

async function entry_point() {
    const root_dir = utils.actual_filename(CONSTS.ROOT_DIRECTORY);
    const mode_data = await get_game_modes(root_dir);

    return Promise.all([
        render_static_pages(),
        render_user_pages(mode_data),
        render_mode_pages(mode_data)
    ]);
}

entry_point();