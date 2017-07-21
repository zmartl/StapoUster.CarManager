/*  Example use:
 *      <toggle-indicator [val]="!entity.isDeleted" [falseTranslation]="'deleted'" [trueLabel]="'label-info'"></toggle-indicator>
 */

import { Component, Input } from '@angular/core';

@Component({
    selector: 'toggle-indicator',
    templateUrl: './toggleIndicator.html'
})
export class ToggleIndicator {
    @Input() val: string;
    @Input() trueTranslation: string = 'active';
    @Input() falseTranslation: string = 'inactive';
    @Input() trueLabel: string = 'label-success';
    @Input() falseLabel: string = 'label-danger';
}