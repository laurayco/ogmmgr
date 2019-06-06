declare module "check-prop-types" {

    import { ValidationMap } from "prop-types";

    function checkPropTypes<T=any>(
        typemap: ValidationMap<T>,
        value: T,
        context: string,
        component: string
    ): string;
    
    export = checkPropTypes;
}