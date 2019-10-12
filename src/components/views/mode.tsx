import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import useMode from "../../effects/data/mode";

interface Props {

};

const ModeView = (props: Props)=>{
    const match = useRouteMatch<{
        author: string,
        mode: string
    }>({
        path: `/a/:author/m/:mode`,
        exact: true
    });

    const author_ref = match ? match.params.author : null;
    const mode_ref = match ? match.params.mode : null;

    const mode_index = useMode(author_ref, mode_ref);

    if(match) {
        if(mode_index) {
            return <div>{JSON.stringify(mode_index,(key,val)=>val,"  ")}</div>;
        } else {
            return <div>loading...</div>
        }
    } else {
        return null;
    }
};

export default ModeView;