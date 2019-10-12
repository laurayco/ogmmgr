import * as React from "react";
import { Route } from "react-router-dom";
import { CssBaseline, Grid, AppBar, Toolbar, Typography, IconButton } from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles";

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
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        Overwatch Game Mode Manager
                    </Typography>
                </Toolbar>
            </AppBar>
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