import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'unsavedChanges-dialog',
    templateUrl: './unsavedChangesDialog.component.html'
})
export class UnsavedChangesDialog {
    constructor(public dialogRef: MdDialogRef<UnsavedChangesDialog>) {}
}