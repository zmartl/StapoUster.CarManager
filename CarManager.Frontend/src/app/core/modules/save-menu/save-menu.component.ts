/*  Example use:
 *      <save-menu [isValid]="form.valid" [translation]="'SomeTranslation'" (saveClicked)="save()"></save-menu>
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'save-menu',
  templateUrl: './save-menu.component.html'
})

export class SaveMenu {
  @Input() isValid: boolean;
  @Input() translation: string = 'object';
  @Output() saveClicked = new EventEmitter();

  constructor(private location: Location) { }

  public save(): void {
    this.saveClicked.emit();
  }

  public back(): void {
    this.location.back();
  }
}