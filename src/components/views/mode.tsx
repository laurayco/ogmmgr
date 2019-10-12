import * as React from "react";
import { Route } from "react-router-dom";

interface Props {

};

const ModeView = (props: Props)=>{
    return <Route path="/a/:author/m/:mode">
        Viewing a mode!
    </Route>;
};

export default ModeView;