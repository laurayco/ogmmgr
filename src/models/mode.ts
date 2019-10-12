import * as PropTypes from "prop-types";
import { PropTypesInterface, DATE_STRING, REPO_FILENAME, URL_PROP } from "./utils";

export interface ModeEntry {
    share_code: string; // what the game client gives for you to share.
    published: DATE_STRING; // when this entry was published.
    code: string;
};

export const ModeEntryProps :
PropTypesInterface<ModeEntry> = {
    share_code: PropTypes.string,
    published: PropTypes.string,
    code: PropTypes.string
};