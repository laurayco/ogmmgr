import {} from "./models";
import load_author from "./data/author";
import load_mode from "./data/mode";
import { read_directory } from "./data/utils";
import config from "./config";
import { renderToString } from "react-dom/server";
import * as React from "react";

type DataBank = any;

async function prerender_page(path: string, databank: DataBank) {
    const dom_replacement = renderToString(React.createElement(Application, { databank }));

}

async function render_mode(author: string, mode: string) {
    const mode_index = await load_mode(author, mode);
}

async function render_author(author: string) {
    // get data
    const author_index = await load_author(author);
    // save data to output
    // render each mode.
    await Promise.all(author_index.modes.map(mn=>render_mode(author, mn)));
}

async function main() {
    const DATA_DIRECTORY = await config.data_directory;
    const list_of_author_names = await read_directory(DATA_DIRECTORY);
    // render each author.
    await Promise.all(list_of_author_names.map(render_author));
}

main();