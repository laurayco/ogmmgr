import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import gray from "@material-ui/core/colors/grey";
import orange from "@material-ui/core/colors/orange";

const primary = gray;
const secondary = orange;

export default responsiveFontSizes(createMuiTheme({
    palette: {
        primary,
        secondary
    }
}), {
    
});