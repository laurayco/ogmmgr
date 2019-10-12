import * as React from "react";
import { useContext, useEffect, useState } from "react";
import DataBankContext from "../../contexts/databank";
import useBaseUrl from "../base-url";

const get_page_key = (page: string)=>{
    if(page===null) return page;

    if(page.endsWith(".html")) {
        return page.slice(0, page.length - ".html".length);
    }
    return page;
};

const page_key_to_data_url = (BASE_URL: string,page_key: string)=>{
    return `${BASE_URL}/p/${page_key}.json`;
};

const load_page_key = async (BASE_URL: string,page: string)=>{
    const url = page_key_to_data_url(BASE_URL,page);
    const req = await fetch(url);
    const data = await req.json();
    return data as string;
};

const usePage = (page: string) => {
    const dbctx = useContext(DataBankContext);
    
    const key = get_page_key(page);
    const ctxpages = Object.assign({}, dbctx.pages);

    const [ page_data, set_page_data] = useState(ctxpages[key]);

    const BASE_URL = useBaseUrl();
    
    useEffect(()=>{
        if(key===null) return;

        if(typeof page_data!=="string") {
            load_page_key(BASE_URL,key).then(pd=>set_page_data(pd));
        }
    }, [key]);
    return page_data;
};

export default usePage;