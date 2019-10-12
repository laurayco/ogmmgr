import * as React from "react";
import { Route } from "react-router-dom";

interface Props {

};

const AuthorView = (props: Props)=>{
    return <Route exact path="/a/:author">
        Viewing an author!
    </Route>
};

export default AuthorView;