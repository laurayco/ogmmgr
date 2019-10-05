import { read_yaml } from "./data/utils";

const CONFIG_FN = process.env["CONFIG_FILE"] || "config.yml";

interface CONFIG {
    data_directory: string;
};

type PromiseWrapped<T> = {
    [K in keyof T]?: Promise<T[K]>;
};

const load_config = async function() {
    const calculate_config = async()=>{
        console.log("CALCULATING CONFIG",new Date());
        const file_config = await read_yaml(CONFIG_FN) as CONFIG;
        const env_config = {};
        return Object.assign({}, env_config, file_config);
    }

    if(typeof this.is_pending===undefined) {
        this.is_pending = null;
        this.result = null;
    }

    if(this.is_pending!==null) {
        return this.is_pending;
    } else {
        this.is_pending = calculate_config();
        const result = await this.is_pending;
        this.is_pending = null;
        return result;
    }
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