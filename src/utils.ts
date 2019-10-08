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

export function flatten(arr: any[]) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}