import { AuthorInformation, AuthorInformationProps } from "./author";
import * as PropTypes from "prop-types";
import { PropTypesInterface } from "./utils";

export interface AuthorIndex {
    author: AuthorInformation;
    modes: string[];
}

export const AuthorIndexProps :
PropTypesInterface<AuthorIndex> = {
    author: PropTypes.shape(AuthorInformationProps),
    modes: PropTypes.arrayOf(PropTypes.string)
};