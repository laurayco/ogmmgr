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

export type PropTypesInterface<T> = {
    [key in keyof T]: PropTypes.Validator<any>;
};