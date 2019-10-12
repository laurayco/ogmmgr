import * as React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core"
import { Menu } from "@material-ui/icons"

interface Props {
    
}

const Header = (props: Props)=>{
    return <AppBar position="static">
        <Toolbar>
            <IconButton color="inherit">
                <Menu />
            </IconButton>
            <Typography variant="h6">
                Overwatch Game Mode Manager
            </Typography>
        </Toolbar>
    </AppBar>;
};

export default Header;