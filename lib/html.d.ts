type F = (this: HTMLElement, ev: Event) => void;
export declare function html(raw_arg: TemplateStringsArray, ...placeholders: (string | F | HTMLCollection)[]): HTMLCollection;
export declare function html(raw_arg: string): HTMLCollection;
export declare function htmlescape(text: string): string;
export {};
