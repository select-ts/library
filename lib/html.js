export function html(raw_arg, ...placeholders) {
    if (typeof raw_arg === 'object') {
        let raw = [...raw_arg];
        var html = raw.shift();
        var functions = [];
        var f_indicator = "\x01F:";
        var elements = [];
        var e_tag = "lo-missing-element";
        var e_indicator = `<${e_tag}></${e_tag}>`;
        for (let el of raw) {
            let val = placeholders.shift();
            if (val instanceof HTMLCollection) {
                elements.push(val);
                html += e_indicator;
            }
            else if (typeof val === 'function') {
                functions.push(val);
                html += f_indicator;
            }
            else {
                html += val;
            }
            html += el;
        }
    }
    else {
        var html = raw_arg;
    }
    let parser = new DOMParser();
    let doc = parser.parseFromString(`<!DOCTYPE html><html><body>${html}</body></html>`, 'text/html');
    if (typeof raw_arg === 'object') {
        if (functions.length > 0) {
            doc.querySelectorAll("*").forEach(el => {
                let attrs = el.getAttributeNames();
                for (let name of attrs) {
                    let value = el.getAttribute(name);
                    if (name.startsWith("on") &&
                        value === f_indicator) {
                        el.removeAttribute(name);
                        let func = functions.shift().bind(el);
                        if (name === "on#") {
                            (async () => func(new CustomEvent("#")))();
                        }
                        else {
                            el.addEventListener(name.substring(2), func);
                        }
                    }
                }
            });
        }
        if (elements.length > 0) {
            doc.querySelectorAll(e_tag).forEach(el => {
                el.replaceWith(...elements.shift());
            });
        }
    }
    return doc.body.children;
}
export function htmlescape(text) {
    return text
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');
}
