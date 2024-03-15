export declare const hashPassword: (password: string) => Promise<string>;
export declare const generateToken: (data: any) => Promise<string>;
export declare const generateAgentCode: (location: string, oldCode: string) => string;
export declare const generateAgentPassword: (last_name: string) => string;
