import * as PropTypes from "prop-types";

/*
    just interface declarations for the data needed to
    render on the website.
*/

const regex_prop_validator = (regex: RegExp) => (props: any, propName: string, componentName: string)=>{
    if(!regex.test(props[propName])) {
        return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Validation failed.'
        );
    }
};

export type GAME_CODE = string;
export const GAME_CODE_PROP = regex_prop_validator(/abc/);
export type GITHUB_SHA = string;
export const GITHUB_SHA_PROP = regex_prop_validator(/abc/);
export type DATE_STRING = string;
export const DATE_STRING_PROP = regex_prop_validator(/abc/);
export type URL = string;
export const URL_PROP = regex_prop_validator(/abc/);
export type REPO_FILENAME = string;
export const REPO_FILENAME_PROP = regex_prop_validator(/^(?!.{256,})(?!(aux|clock\$|con|nul|prn|com[1-9]|lpt[1-9])(?:$|\.))[^ ][ \.\w-$()+=[\];#@~,&amp;']+[^\. ]$/i);

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
};

export const ModeEntryProps :
PropTypesInterface<ModeEntry> = {
    share_code: PropTypes.string,
    published: PropTypes.string
};

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