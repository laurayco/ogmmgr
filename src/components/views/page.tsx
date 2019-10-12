import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import * as marked from "marked";

import useBaseUrl from "../../effects/base-url";
import usePage from "../../effects/data/page";

interface Props {

};

const PageView = (props: Props)=>{
    const BASE_URL = useBaseUrl();
    const match = useRouteMatch<{
        page: string
    }>({
        path: `${BASE_URL}/p/:page`,
        exact: true
    });

    const page_ref = match ? match.params.page : null;
    const page = usePage(page_ref);

    if(match) {
        if(page) {
            const output = marked(page, {});
            return <div dangerouslySetInnerHTML={{__html:output}} />;
        } else {
            return <div>loading...</div>
        }
    } else {
        return null;
    }
};

export default PageView;