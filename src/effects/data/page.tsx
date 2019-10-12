import * as React from "react";
import { useContext, useEffect, useState } from "react";
import DataBankContext from "../../contexts/databank";

const get_page_key = (page: string)=>{
    if(page===null) return page;

    if(page.endsWith(".html")) {
        return page.slice(0, page.length - page.lastIndexOf(".html") - 1);
    }
    return page;
};

const page_key_to_data_url = (page_key: string)=>{
    return `/p/${page_key}.json`;
};

const load_page_key = async (page: string)=>{
    const url = page_key_to_data_url(page);
    const req = await fetch(url);
    const data = await req.json();
    return data as string;
};

const usePage = (page: string) => {
    const dbctx = useContext(DataBankContext);
    
    const key = get_page_key(page);
    const ctxpages = Object.assign({}, dbctx.pages);

    const [ page_data, set_page_data] = useState(ctxpages[key]);

    useEffect(()=>{
        if(typeof page_data!=="string" && key!==null) {
            load_page_key(key).then(pd=>set_page_data(pd));
        }
    }, [page_data]);
    return page_data;
};

export default usePage;