export interface $ {
    query(selector: string): $;
}
export interface Options {
    parent?: Element | null;
    returnVoid?: boolean;
}
export declare function $(query: string, returnVoid?: true | (Options & {
    "returnVoid"?: true;
})): $ | void;
export declare function $(query: string, returnVoid: false | (Options & {
    "returnVoid": false;
})): $;
