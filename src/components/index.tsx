import * as React from "react";
import {
    BrowserRouter,
    StaticRouter,
    Route,
    Redirect
} from "react-router-dom";

import { ModeIndex, AuthorIndex } from "../models";
import UX from "./ux";
import DataBank from "../contexts/databank";
import useBaseUrl from "../effects/base-url";

export type DataBank = {
    modes?: {
        [author: string]: {
           [mode: string]: ModeIndex
        }
    },
    authors?: {
        [author: string]: AuthorIndex
    },
    pages?: {
        [name: string]: string
    }
}

interface AppProps {
    databank: DataBank,
    prerender_path?: string
}

export default ( props: AppProps ) => {
    const BASE_URL = useBaseUrl();
    const rest = <DataBank.Provider value={props.databank}>
        <Route exact path={`${BASE_URL}/`}>
            <Redirect to={`${BASE_URL}/p/home.html`} />
        </Route>
        <Route exact path={`${BASE_URL}/index.html`}>
            <Redirect to={`${BASE_URL}/p/home.html`} />
        </Route>
        <UX />
    </DataBank.Provider>;

    if(props.prerender_path) {
        return <StaticRouter location={props.prerender_path}>
            {rest}
        </StaticRouter>;
    } else {
        return <BrowserRouter>
            {rest}
        </BrowserRouter>;
    }
};