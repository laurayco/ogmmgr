import * as React from "react";
import { Route } from "react-router-dom";
import { CssBaseline, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";

import Footer from "./footer";
import Header from "./header";

import PageView from "../views/page";
import AuthorView from "../views/author";
import ModeView from "../views/mode";

interface Props {

};

const useStyles = makeStyles(theme=>({
    expand: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: "100%",
        width: "100%"
    }
}));

export default (props: Props)=>{

    const styles = useStyles({

    });

    return <Grid container direction="column" spacing={0} className={styles.expand}>
        <CssBaseline />
        <Grid item className="header">
            <Header />
        </Grid>
        <Grid item xs>
            <PageView />
            <AuthorView />
            <ModeView />
        </Grid>
        <Grid item className="footer">
            <Footer />
        </Grid>
    </Grid>;
};