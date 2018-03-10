import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[evehq-component-host]'
})
export class ComponentHostDirective {

	constructor(public viewContainerRef: ViewContainerRef) {
	}
}
