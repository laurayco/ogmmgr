import * as React from "react";
import { Route } from "react-router-dom";

interface Props {

};

const PageView = (props: Props)=>{
    return <Route path="/p/:page">
        Viewing a page!
    </Route>
};

export default PageView;