import * as React from "react";
import { Route } from "react-router-dom";
import useBaseUrl from "../../effects/base-url";

interface Props {

};

const AuthorView = (props: Props)=>{
    const BASE_URL = useBaseUrl();
    return <Route exact path={`${BASE_URL}/a/:author`}>
        Viewing an author!
    </Route>
};

export default AuthorView;