export interface $ {
    query(selector: string): $;
}

type $Arg = NodeListOf<Element> | Element[];
class $Element implements $ {
    private readonly els: Element[];

    public constructor(els: $Arg) {
        if (els instanceof NodeList)
            this.els = Array.from(els);
        else this.els = els;
    }

    public query(selector: string): $ {
        return new $Element(
            this.els.flatMap(parent => Array.from(
                parent.querySelectorAll(selector)
            ))
        );
    }

    public get(): Element[];
    public get(index: number): Element | null;

    public get(index?: number): Element | Element[] | null {
        return index !== void 0 ?
            this.els[index] ?? null
        : this.els;
    }
}

export interface Options {
    /** @default {null} */
    parent?: Element | null;

    /** @default {true} */
    returnVoid?: boolean;
}

export function $(query: string, returnVoid?: true | (Options & {
    "returnVoid"?: true
})): $ | void;

export function $(query: string, returnVoid: false | (Options & {
    "returnVoid": false
})): $;

export function $(query: string): $ | void {
    return new $Element(
        document.querySelectorAll(query)
    );
}
