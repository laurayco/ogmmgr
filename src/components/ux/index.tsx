import * as React from "react";
import { Route } from "react-router-dom";
import { CssBaseline, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";

interface Props {

};

const useStyles = makeStyles(theme=>({
    expand: {
        flexGrow: 1
    }
}));

export default (props: Props)=>{

    const styles = useStyles();

    return <Grid container direction="column" spacing={0}>
        <CssBaseline />
        <Grid item className="header">
            HEADER.
        </Grid>
        <Grid item xs className={`body `}>
            BODY.
            <Route path="/p/:page">
                <p>PAGE</p>
            </Route>
            <Route exact path="/a/:author">
                <p>AUTHOR</p>
            </Route>
            <Route path="/a/:author/m/:mode">
                <p>MODE</p>
            </Route>
        </Grid>
        <Grid item className="footer">
            FOOTER.
        </Grid>
    </Grid>;
};