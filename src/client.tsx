import * as React from "react";
import * as ReactDOM from "react-dom";
import App, { DataBank } from "./components";
import "./style.css";

export default async (databank: DataBank)=>{
    const root_el = document.querySelector("#root");
    const base_url = process.env.base_url;
    return new Promise((resolve,reject)=>{
        ReactDOM.hydrate(<App {... {base_url, databank}}/>, root_el, ()=>{
            resolve();
        });
    });
}
