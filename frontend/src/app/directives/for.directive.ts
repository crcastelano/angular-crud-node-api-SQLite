import {
  Directive,
  OnInit,
  Input,
  ViewContainerRef,
  TemplateRef
} from "@angular/core";

// DIRETIVA ESTRUTURAL

@Directive({
  selector: "[myFor]"
})
export class ForDirective implements OnInit {
  @Input("myForEm") numbers: number[];

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}

  ngOnInit() {
   for (let number of this.numbers) {
     // this.template é o <li>, onde foi utilizada essa diretiva estrutural
     this.container.createEmbeddedView(this.template, { $implicit: number });
   }
  }
}
