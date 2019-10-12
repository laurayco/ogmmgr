import { read_yaml } from "./repo-data/utils";

const CONFIG_FN = process.env["CONFIG_FILE"] || "config.yml";

interface CONFIG {
    data_directory: string;
    output_directory: string;
    page_directory: string;
    port: number;
    redirects: string[];
    base_url: string;
};

type PromiseWrapped<T> = {
    [K in keyof T]?: Promise<T[K]>;
};

const load_config = async function() {
    const calculate_config = async()=>{
        const output = {};
        const env_config = {};
        const keys : (keyof CONFIG)[] = [
            "data_directory",
            "page_directory",
            "output_directory",
            "port",
            "base_url"
        ];
        for(let key of keys) {
            env_config[key] = process.env[key] || null;
        }
        if(env_config["base_url"]===null) {
            env_config["base_url"] = "";
        }
        if(env_config["port"]!==null) {
            env_config["port"] = parseInt(env_config["port"]);
        }
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