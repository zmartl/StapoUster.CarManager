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

import { StatisticService } from "../../shared/services/statistic.service";
import { DeleteDialog } from "../../core/modules/deleteDialog/deleteDialog.component";
import { StatisticModel } from "../../shared/models/statistic.model";

@Component({
    selector: '[statistic-list-item]',
    templateUrl: '../templates/statistic.list.item.html'
})

export class StatisticListItem {
    @Input() statistic: StatisticModel;
    private statisticCopy: StatisticModel;

    public isEditMode: boolean = false;

    constructor(public statisticService: StatisticService, private translate: TranslateService, private toastr: ToastrService, private commonService: CommonService, private dialog: MdDialog, private errorHandlerService: ErrorHandlerService) {}

    public setEdit() {
        this.isEditMode = !this.isEditMode;
        this.copyInput();
    }

    public resetEdit() {
        this.isEditMode = !this.isEditMode;
        this.statistic = this.statisticCopy;
    }

    private copyInput() {
        this.statisticCopy = _.cloneDeep(this.statistic);
    }

    private hasModelChanges(): boolean {
        return !_.isEqual(this.statistic, this.statisticCopy);
    }

    public canSave(form): boolean {
        return form.valid && this.hasModelChanges();
    }

    public update() {
        this.statisticService.update(this.statistic)
            .subscribe(
            (response) => {
                this.isEditMode = !this.isEditMode;
                this.translate.get(['statistic.one', 'additional.update', 'success']).subscribe((res: string) => {
                    this.toastr.success(res['statistic.one'] + res['additional.update'], res['success']);
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
                this.statisticService.delete(this.statistic.id)
                    .subscribe(
                    () => {
                        this.translate.get(['statistic.one', 'additional.delete', 'success']).subscribe((res: string) => {
                            this.toastr.success(res['statistic.one'] + res['additional.delete'], res['success']);
                        });
                        EmitterService.get("StatisticSearchChanged").emit();
                    },
                    (error: ErrorHandlerModel) => {
                        this.errorHandlerService.showError(error);
                    });
            }
        });
    }
}