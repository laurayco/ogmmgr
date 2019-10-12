import { useContext } from "react";
import base_url from "../contexts/base-url";

const useBaseUrl = ()=>{
    return useContext(base_url);
}

export default useBaseUrl;