import * as React from "react";
import { Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core"

interface Props {

};

export default (props: Props)=>{
    return <>
        <CssBaseline />
        <div>
            <strong>HEADER</strong>
        </div>
        <p>BODY</p>
        <Route path="/p/:page">
            <p>PAGE</p>
        </Route>
        <Route exact path="/a/:author">
            <p>AUTHOR</p>
        </Route>
        <Route path="/a/:author/m/:mode">
            <p>MODE</p>
        </Route>
    </>;
};