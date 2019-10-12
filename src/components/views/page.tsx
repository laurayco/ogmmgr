import * as React from "react";
import { Route, useRouteMatch } from "react-router-dom";

import usePage from "../../effects/data/page";

interface Props {

};

const PageView = (props: Props)=>{
    const match = useRouteMatch<{
        page: string
    }>({
        path: `/p/:page`,
        exact: true
    });

    const page_ref = match ? match.params.page : null;
    const page = usePage(page_ref);

    if(match) {
        return <span>{page}</span>;
    } else {
        return null;
    }
};

export default PageView;