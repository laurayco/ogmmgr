import * as PropTypes from "prop-types";

/*
    just interface declarations for the data needed to
    render on the website.
*/

export type GAME_CODE = string;
export type GITHUB_SHA = string;
export type GAME_MODE_CODE = string;
export type DATE_STRING = string;
export type URL = string;
export type REPO_FILENAME = string;

type PropTypesInterface<T> = {
    [key in keyof T]: PropTypes.Validator<any>;
};

export interface AuthorInformation {
    contributor: string;
    battlenet_name?: string;
    battlenet_numbers?: number;
};

export const AuthorInformationProps :
PropTypesInterface<AuthorInformation> = {
    contributor: PropTypes.string,
    battlenet_name: PropTypes.string,
    battlenet_numbers: PropTypes.number
};

export interface ModeEntry {
    share_code: string; // what the game client gives for you to share.
    published: DATE_STRING; // when this entry was published.
    preview_video: URL; // used on page for this entry.
    preview_image: URL; // used to show thumbnails.
};

export const ModeEntryProps :
PropTypesInterface<ModeEntry> = {
    share_code: PropTypes.string,
    published: PropTypes.string,
    preview_video: PropTypes.string,
    preview_image: PropTypes.string
};

export interface ModeIndex {
    // name of the game mode (hint this from the folder if not specified.)
    name: string;
    // information of the author (hint this from git information if not provided.)
    author: AuthorInformation;
    // should point to a file with a markdown description.
    description: REPO_FILENAME;
    // user should not modify this themselves! let the build process do that.
    history: ModeEntry[];
};

export const ModeIndexProps :
PropTypesInterface<ModeIndex> = {
    name: PropTypes.string,
    author: PropTypes.oneOfType(null),
    description: PropTypes.string,
    history: PropTypes.arrayOf(PropTypes.oneOfType(null))
};