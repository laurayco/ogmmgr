import { read_yaml } from "./repo-data/utils";

const CONFIG_FN = process.env["CONFIG_FILE"] || "config.yml";

interface CONFIG {
    data_directory: string;
    output_directory: string;
    page_directory: string;
    port: number;
    redirects: string[];
};

type PromiseWrapped<T> = {
    [K in keyof T]?: Promise<T[K]>;
};

const load_config = async function() {
    const calculate_config = async()=>{
        const output = {};
        const env_config = {};
        Object.assign(output, env_config);
        try {
            const file_config = await read_yaml(CONFIG_FN) as CONFIG;
            Object.assign(output, file_config);
        } catch(ex) {
        }
        return output as unknown as CONFIG;
    }

    return calculate_config();

    // if(typeof this.is_pending===undefined) {
    //     this.is_pending = null;
    //     this.result = null;
    // }

    // if(this.is_pending!==null) {
    //     return this.is_pending;
    // } else {
    //     this.is_pending = calculate_config();
    //     const result = await this.is_pending;
    //     this.is_pending = null;
    //     return result;
    // }
};

export default new Proxy<PromiseWrapped<CONFIG>>({}, {
    get: async <K extends keyof CONFIG>(target, prop: K, receiver) => {
        const updated_config = await load_config();
        if(target[prop]!==updated_config[prop]) {
            // update stored object value.
            target[prop] = updated_config[prop];
        }
        return target[prop] as CONFIG[K];
    }
});

export const Naked = ()=>load_config();