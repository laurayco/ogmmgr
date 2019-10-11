import { promisify } from "util";
import { writeFile, mkdir } from "fs";
import { parse, join } from "path";

import { renderToString } from "react-dom/server";
import { compileFile } from "pug";
import * as React from "react";

import {} from "./models";
import load_author from "./data/author";
import load_mode from "./data/mode";
import { read_directory, read_text_file } from "./data/utils";
import config from "./config";
import Application, { DataBank } from "./components";

const compile_html_page = compileFile(join(__dirname,"templates/index.pug"));

async function ensure_directory(dirname: string) {
    try {
        await promisify(mkdir)(dirname, {
            recursive: true
        });
    } catch(ex) {
        // ignore
        console.error("ERROR CREATING DIRECTORY", ex);
    }
}

async function path_to_fn(path: string, extension: string) {
    path = path.replace(/^\/+/,""); //remove leading /'s
    path = path.replace(/\/+$/,""); //remove trailing /'s
    const output_directory = await config.output_directory;
    return `${output_directory}/${path}.${extension}`;
}

async function prerender_page(path: string, databank: DataBank) {
    const content = renderToString(React.createElement(Application, { databank, prerender_path: path }));
    const fn = await path_to_fn(path,"html");
    const dirname = parse(fn).dir;
    await ensure_directory(dirname);
    const html_output = compile_html_page({
        content,
        databank,
        scripts: [
            "/static/js/app-bundle.js"
        ],
        styles: [
            "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        ]
    })
    await promisify(writeFile)(fn, html_output);
}

async function render_mode(author: string, mode: string) {
    const mode_index = await load_mode(author, mode);
    prerender_page(`/a/${author}/m/${mode}`, {
        modes: {
            [author]: {
                [mode]: mode_index
            }
        }
    })
}

async function render_author(author: string) {
    // get data
    const author_index = await load_author(author);
    // save data to output
    // render each mode.
    await Promise.all(author_index.modes.map(mn=>render_mode(author, mn)));
}

async function render_page(page: string) {
    const PAGE_DIRECTORY = await config.page_directory;
    const page_fn = join(PAGE_DIRECTORY, page);
    const page_name = parse(page).name;
    const page_contents = await read_text_file(page_fn);
    await prerender_page(`/p/${page_name}`,{
        pages: {
            [page_name]: page_contents
        }
    });
}

async function main() {
    const DATA_DIRECTORY = await config.data_directory;
    const PAGE_DIRECTORY = await config.page_directory;
    const list_of_author_names = await read_directory(DATA_DIRECTORY,{
        withFileTypes: true,
    });
    // render each author.
    await Promise.all(list_of_author_names.filter(fn=>fn.isDirectory()).map(fn=>render_author(fn.name)));
    // render each page
    const list_of_pages = await read_directory(PAGE_DIRECTORY, {
        withFileTypes: true
    });
    await Promise.all(list_of_pages.filter(fn=>fn.isFile()).map(fn=>render_page(fn.name)));
}

main();