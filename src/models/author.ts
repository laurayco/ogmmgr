import * as PropTypes from "prop-types";
import { PropTypesInterface, DATE_STRING, REPO_FILENAME, URL_PROP } from "./utils";

export interface AuthorInformation {
    contributor: string;
    battlenet_name?: string[];
};

export const AuthorInformationProps :
PropTypesInterface<AuthorInformation> = {
    contributor: PropTypes.string,
    battlenet_name: PropTypes.string
};