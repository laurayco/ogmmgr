import * as React from "react";
import * as ReactDOM from "react-dom";
import App, { DataBank } from "./components";

import "./style.css";

export default async (databank: DataBank)=>{
    const root_el = document.querySelector("#root");
    return new Promise((resolve,reject)=>{
        ReactDOM.hydrate(<App databank={databank} />, root_el, ()=>{
            resolve();
        });
    });
}