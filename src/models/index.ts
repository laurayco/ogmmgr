import * as game_mode_info from "./game_mode_index";

export type AuthorInfo = game_mode_info.AuthorInformation;
export type ModeEntry = game_mode_info.ModeEntry;
export type ModeIndex = game_mode_info.ModeIndex;

export const PropTypes = {
    REPO_FILENAME: game_mode_info.REPO_FILENAME_PROP,
    DATE_STRING: game_mode_info.DATE_STRING_PROP,
    GAME_CODE: game_mode_info.GAME_CODE_PROP,
    URL: game_mode_info.URL_PROP,
    GITHUB_SHA: game_mode_info.GITHUB_SHA_PROP
};

export default {
    AuthorInfo: game_mode_info.AuthorInformationProps,
    ModeEntry: game_mode_info.ModeEntryProps,
    ModeIndex: game_mode_info.ModeIndexProps
};