import { Directive, ElementRef } from "@angular/core";

// DIRETIVA DE ATRIBUTO

@Directive({
  selector: "[appRed]"
})
export class RedDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.color = "#e35e6b";
  }
}
