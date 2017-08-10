import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DatePipe } from '@angular/common';

import { TranslateService } from 'ng2-translate';
import { ToastrService } from 'ngx-toastr';
import { MdDialog } from '@angular/material';

import * as _ from 'lodash';

import { CommonService } from "../../core/services/common.service";
import { EmitterService } from "../../core/services/emitter.service";
import { ErrorHandlerModel, ErrorMode } from "../../core/models/errorHandler.model";

import { ErrorHandlerService } from "../../core/services/errorHandler.service";

import { PlanningService } from "../../shared/services/planning.service";
import { DeleteDialog } from "../../core/modules/deleteDialog/deleteDialog.component";
import { PlanningModel } from "../../shared/models/planning.model";

@Component({
    selector: '[planning-list-item]',
    templateUrl: '../templates/planning.list.item.html'
})

export class PlanningListItem {
    @Input() planning: PlanningModel;
    private planningCopy: PlanningModel;

    public isEditMode: boolean = false;

    constructor(public planningService: PlanningService, private translate: TranslateService, private toastr: ToastrService, private commonService: CommonService, private dialog: MdDialog, private errorHandlerService: ErrorHandlerService) {}

    public setEdit() {
        this.isEditMode = !this.isEditMode;
        this.copyInput();
    }

    public resetEdit() {
        this.isEditMode = !this.isEditMode;
        this.planning = this.planningCopy;
    }

    private copyInput() {
        this.planningCopy = _.cloneDeep(this.planning);
    }

    private hasModelChanges(): boolean {
        return !_.isEqual(this.planning, this.planningCopy);
    }

    public canSave(form): boolean {
        return form.valid && this.hasModelChanges();
    }

    public update() {
        this.planningService.update(this.planning)
            .subscribe(
            (response) => {
                this.isEditMode = !this.isEditMode;
                this.translate.get(['planning.one', 'additional.update', 'success']).subscribe((res: string) => {
                    this.toastr.success(res['planning.one'] + res['additional.update'], res['success']);
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
                this.planningService.delete(this.planning.id)
                    .subscribe(
                    () => {
                        this.translate.get(['planning.one', 'additional.delete', 'success']).subscribe((res: string) => {
                            this.toastr.success(res['planning.one'] + res['additional.delete'], res['success']);
                        });
                        EmitterService.get("PlanningSearchChanged").emit();
                    },
                    (error: ErrorHandlerModel) => {
                        this.errorHandlerService.showError(error);
                    });
            }
        });
    }
}