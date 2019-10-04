import { AuthorInformation, AuthorInformationProps } from "./author";
import { ModeEntry, ModeEntryProps } from "./mode";
import { ModeIndex, ModeIndexProps } from "./mode_index";

export type AuthorInfo = AuthorInformation;
export type ModeEntry = ModeEntry;
export type ModeIndex = ModeIndex;

export default {
    AuthorInfo: AuthorInformationProps,
    ModeEntry: ModeEntryProps,
    ModeIndex: ModeIndexProps
};