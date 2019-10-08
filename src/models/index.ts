import { AuthorInformation, AuthorInformationProps } from "./author";
import { AuthorIndex, AuthorIndexProps } from "./author_index";
import { ModeEntry, ModeEntryProps } from "./mode";
import { ModeIndex, ModeIndexProps } from "./mode_index";

export type AuthorInfo = AuthorInformation;
export type ModeEntry = ModeEntry;
export type ModeIndex = ModeIndex;
export type AuthorIndex = AuthorIndex;

export default {
    AuthorInfo: AuthorInformationProps,
    ModeEntry: ModeEntryProps,
    ModeIndex: ModeIndexProps,
    AuthorIndex: AuthorIndexProps
};