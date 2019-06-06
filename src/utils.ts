// nodejs imports
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
export const fileStat = promisify(fs.stat);
export const readdir = promisify(fs.readdir);
export const fileExists = promisify(fs.exists);
export const isFile = promisify(fs.readdir)

// npm package imports
import * as checkPropTypes from 'check-prop-types';
import { ValidationMap } from "prop-types";
import * as marked_func from "marked";

export const marked = async (src: string, opts?: marked_func.MarkedOptions) : Promise<string>=>{
    return new Promise((resolve,reject)=>{
        marked_func(src, opts, (err,result)=>{
            if(err) reject(err);
            else resolve(result);
        });
    });
};

// project local imports
import * as CONSTS from "./consts.json";

export const test_types = <T=any>(
    tmaps: ValidationMap<T>,
    val: T,
    ctx: string,
    component: string
)=>{
    const comparison_message = checkPropTypes.assertPropTypes(tmaps, val, ctx, component);
    if(comparison_message===undefined) {
        return true;
    } else {
        throw new Error(comparison_message);
    }
};

export const actual_filename = repo_filename=>path.resolve(repo_filename);

export const only_directories = async (root: string,filenames: string[])=>{
    const filestats = await Promise.all(filenames.map(async fn=>{
        const stats = await fileStat(path.resolve(root,fn));
        return {stats,fname: fn};
    }));
    return filestats.filter(fs=>fs.stats.isDirectory()).map(fs=>fs.fname);
};

export const only_files = async (root: string,filenames: string[])=>{
    const filestats = await Promise.all(filenames.map(async fn=>{
        const stats = await fileStat(path.resolve(root,fn));
        return {stats,fname: fn};
    }));
    return filestats.filter(fs=>fs.stats.isFile()).map(fs=>fs.fname);
};

export const sub_directories = async root=>only_directories(root, await readdir(root));
export const directory_files = async root=>only_files(root, await readdir(root));

export function flatten(arr: any[]) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}