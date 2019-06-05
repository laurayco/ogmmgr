import * as game_mode_info from "./game_mode_index";

export type AuthorInfo = game_mode_info.AuthorInformation;
export type ModeEntry = game_mode_info.ModeEntry;
export type ModeIndex = game_mode_info.ModeIndex;

export default {
    AuthorInfo: game_mode_info.AuthorInformationProps,
    ModeEntry: game_mode_info.ModeEntryProps,
    ModeIndex: game_mode_info.ModeIndexProps
};