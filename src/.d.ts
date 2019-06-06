declare module "check-prop-types" {

    import * as PropTypes from "prop-types";

    function checkPropTypes<T=any>(
        typemap: PropTypes.ValidationMap<T>,
        value: T,
        context: string,
        component: string
    ): boolean;
    
    export = checkPropTypes;
}