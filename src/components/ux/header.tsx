import * as React from "react";
import { AppBar, Toolbar, Typography, IconButton, Icon } from "@material-ui/core"

interface Props {
    
}

const Header = (props: Props)=>{
    return <AppBar position="static">
        <Toolbar>
            <IconButton color="inherit">
                <Icon>menu</Icon>
            </IconButton>
            <Typography variant="h6">
                Overwatch Game Mode Manager
            </Typography>
        </Toolbar>
    </AppBar>;
};

export default Header;