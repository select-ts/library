class $Element {
    els;
    constructor(els) {
        if (els instanceof NodeList)
            this.els = Array.from(els);
        else
            this.els = els;
    }
    query(selector) {
        return new $Element(this.els.flatMap(parent => Array.from(parent.querySelectorAll(selector))));
    }
    get(index) {
        return index !== void 0 ?
            this.els[index] ?? null
            : this.els;
    }
}
export function $(query) {
    return new $Element(document.querySelectorAll(query));
}
