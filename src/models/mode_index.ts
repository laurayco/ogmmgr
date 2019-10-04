import * as PropTypes from "prop-types";
import { PropTypesInterface, DATE_STRING, REPO_FILENAME, URL_PROP } from "./utils";
import { AuthorInformation, AuthorInformationProps } from "./author";
import { ModeEntry, ModeEntryProps } from "./mode";

export interface ModeIndex {
    // name of the game mode (hint this from the folder if not specified.)
    name: string;
    // information of the author (hint this from git information if not provided.)
    author: AuthorInformation;
    // should point to a file with a markdown description.
    description: REPO_FILENAME;
    // used on page for this entry.
    preview_video?: URL;
    // used to show thumbnails.
    preview_image?: URL;
    // user should not modify this themselves! let the build process do that.
    history: ModeEntry[];
};

export const ModeIndexProps :
PropTypesInterface<ModeIndex> = {
    preview_image: URL_PROP,
    preview_video: URL_PROP,
    name: PropTypes.string,
    author: PropTypes.shape(AuthorInformationProps),
    description: PropTypes.string,
    history: PropTypes.arrayOf(PropTypes.shape(ModeEntryProps))
};