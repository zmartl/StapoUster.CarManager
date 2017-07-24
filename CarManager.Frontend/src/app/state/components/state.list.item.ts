import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TranslateService } from 'ng2-translate';
import { ToastrService } from 'ngx-toastr';
import { MdDialog } from '@angular/material';

import * as _ from 'lodash';

import { CommonService } from "../../core/services/common.service";
import { EmitterService } from "../../core/services/emitter.service";
import { ErrorHandlerModel, ErrorMode } from "../../core/models/errorHandler.model";

import { ErrorHandlerService } from "../../core/services/errorHandler.service";

import { StateService } from "../../shared/services/state.service";
import { DeleteDialog } from "../../core/modules/deleteDialog/deleteDialog.component";
import { StateModel } from "../../shared/models/state.model";

@Component({
    selector: '[state-list-item]',
    templateUrl: '../templates/state.list.item.html'
})

export class StateListItem {
    @Input() state: StateModel;
    private stateCopy: StateModel;

    public isEditMode: boolean = false;

    constructor(public stateService: StateService, private translate: TranslateService, private toastr: ToastrService, private commonService: CommonService, private dialog: MdDialog, private errorHandlerService: ErrorHandlerService) {}

    public setEdit() {
        this.isEditMode = !this.isEditMode;
        this.copyInput();
    }

    public resetEdit() {
        this.isEditMode = !this.isEditMode;
        this.state = this.stateCopy;
    }

    private copyInput() {
        this.stateCopy = _.cloneDeep(this.state);
    }

    private hasModelChanges(): boolean {
        return !_.isEqual(this.state, this.stateCopy);
    }

    public canSave(form): boolean {
        return form.valid && this.hasModelChanges();
    }

    public update() {
        this.stateService.update(this.state)
            .subscribe(
            (response) => {
                this.isEditMode = !this.isEditMode;
                this.translate.get(['state', 'additional.update', 'success']).subscribe((res: string) => {
                    this.toastr.success(res['state'] + res['additional.update'], res['success']);
                });
            },
            (error: ErrorHandlerModel) => {
                this.errorHandlerService.showError(error);
            });
    }

    public delete() {
        let dialogRef = this.dialog.open(DeleteDialog);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.stateService.delete(this.state.id)
                    .subscribe(
                    () => {
                        this.translate.get(['state', 'additional.delete', 'success']).subscribe((res: string) => {
                            this.toastr.success(res['state'] + res['additional.delete'], res['success']);
                        });
                        EmitterService.get("StateSearchChanged").emit();
                    },
                    (error: ErrorHandlerModel) => {
                        this.errorHandlerService.showError(error);
                    });
            }
        });
    }

    public toggleActive() {
        this.stateService.toggleActive(this.state.id)
            .subscribe(() => {
                EmitterService.get("StateSearchChanged").emit();
            },
            (error: ErrorHandlerModel) => {
                this.errorHandlerService.showError(error);
            });
    }
}