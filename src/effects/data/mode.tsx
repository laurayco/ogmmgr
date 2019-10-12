import * as React from "react";
import { useContext, useEffect, useState } from "react";
import DataBankContext from "../../contexts/databank";
import { ModeIndex } from "../../models";

const get_mode_key = (mode: string)=>{
    if(mode===null) return mode;

    if(mode.endsWith(".html")) {
        return mode.slice(0, mode.length - ".html".length);
    }
    return mode;
};

const mode_key_to_data_url = (author_key: string, mode_key: string)=>{
    return `/a/${author_key}/m/${mode_key}.json`;
};

const load_mode_key = async (author:string, mode: string)=>{
    const url = mode_key_to_data_url(author, mode);
    const req = await fetch(url);
    const data = await req.json();
    return data as ModeIndex;
};

const useMode = (author: string, mode: string) => {
    const dbctx = useContext(DataBankContext);

    const mode_key = get_mode_key(mode)
    
    const stored_authors = Object.assign({},dbctx.modes);
    const stored_modes = Object.assign({}, stored_authors[author]);
    const stored_mode = stored_modes[mode_key];

    const [ mode_data, set_mode_data] = useState(stored_mode);

    useEffect(()=>{
        if(author===null||mode_key===null) return;

        if(typeof mode_data!=="object" || mode_data === undefined) {
            load_mode_key(author, mode_key).then(pd=>set_mode_data(pd));
        }
    }, [author,mode_key]);
    return mode_data;
};

export default useMode;