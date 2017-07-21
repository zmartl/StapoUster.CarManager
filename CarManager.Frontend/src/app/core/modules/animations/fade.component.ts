import {
    Component, OnChanges, Input,
    trigger, state, animate, transition, style
} from '@angular/core';

@Component({
    selector: 'component-fader',
    template: `
    <div *ngIf="show" [@shrinkOut]="show">
      <ng-content></ng-content>
    </div>
  `,
    animations: [
        trigger(
            'myAnimation',
            [
                transition(
                    ':enter', [
                        style({ transform: 'translateX(100%)', opacity: 0 }),
                        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
                    ]
                ),
                transition(
                    ':leave', [
                        style({ transform: 'translateX(0)', 'opacity': 1 }),
                        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
          
        ]
                )]
        ),
        trigger('shrinkOut', [
            state('in', style({ height: '*' })),
            transition('* => void', [
                style({ height: '*' }),
                animate(250, style({ height: 0 }))
            ])
        ])
    ]
})
export class FaderComponent implements OnChanges {
    @Input() isVisible: boolean = true;
    show: boolean = true;

    ngOnChanges() {
        this.show = this.isVisible;
    }
}