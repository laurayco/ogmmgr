declare module "check-prop-types" {

    import { ValidationMap } from "prop-types";

    type checkPropTypesFunc<R,T=any> = (
        typemap: ValidationMap<T>,
        value: T,
        context: string,
        component: string
    ) => R;

    type module_exports = checkPropTypesFunc<string> & {
        assertPropTypes : checkPropTypesFunc<void>
    };
    
    export = module_exports;
}