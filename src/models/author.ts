import * as PropTypes from "prop-types";
import { PropTypesInterface, DATE_STRING, REPO_FILENAME, URL_PROP } from "./utils";

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