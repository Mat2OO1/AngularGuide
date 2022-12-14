import {Directive, HostBinding, HostListener, Input, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen : boolean = false;

  @HostListener('click') toggleOpen(eventData : Event){
    this.isOpen = !this.isOpen;
  }
}
