import * as React from "react";
import { ModeIndex, AuthorIndex } from "../models";

export type DataBank = {
    modes: {
        [author: string]: {
           [mode: string]: ModeIndex
        }
    },
    authors: {
        [author: string]: AuthorIndex
    },
    pages: {
        [name: string]: string
    }
}

interface AppProps {
    databank: DataBank
}

export default ( props: AppProps ) => {
    return <strong>hello world</strong>;
};