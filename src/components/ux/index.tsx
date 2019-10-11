import * as React from "react";
import { Route } from "react-router-dom";

interface Props {

};

export default (props: Props)=>{
    return <>
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