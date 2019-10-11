import { createContext } from "react";
import { DataBank } from "../components";

export default createContext<DataBank>({
    authors: {},
    modes: {},
    pages: {}
});