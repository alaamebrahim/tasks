import { ElementRef, OnChanges, Renderer2 } from '@angular/core';
export declare class NgOptionHighlightDirective implements OnChanges {
    private elementRef;
    private renderer;
    term: string;
    label: any;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    ngOnChanges(): void;
    private _highlightLabelWithSearchTerm();
    private _setInnerHtml(html);
}
