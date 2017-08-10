import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TranslateService } from 'ng2-translate';
import { ToastrService } from 'ngx-toastr';
import { MdDialog } from '@angular/material';

import * as _ from 'lodash';

import { CommonService } from "../../core/services/common.service";
import { EmitterService } from "../../core/services/emitter.service";
import { ErrorHandlerModel, ErrorMode } from "../../core/models/errorHandler.model";

import { ErrorHandlerService } from "../../core/services/errorHandler.service";

import { CarService } from "../../shared/services/car.service";
import { DeleteDialog } from "../../core/modules/deleteDialog/deleteDialog.component";
import { CarModel } from "../../shared/models/car.model";

@Component({
    selector: '[car-list-item]',
    templateUrl: '../templates/car.list.item.html'
})

export class CarListItem {
    @Input() car: CarModel;
    private carCopy: CarModel;

    public isEditMode: boolean = false;

    constructor(public carService: CarService, private translate: TranslateService, private toastr: ToastrService, private commonService: CommonService, private dialog: MdDialog, private errorHandlerService: ErrorHandlerService) {}

    public setEdit() {
        this.isEditMode = !this.isEditMode;
        this.copyInput();
    }

    public resetEdit() {
        this.isEditMode = !this.isEditMode;
        this.car = this.carCopy;
    }

    private copyInput() {
        this.carCopy = _.cloneDeep(this.car);
    }

    private hasModelChanges(): boolean {
        return !_.isEqual(this.car, this.carCopy);
    }

    public canSave(form): boolean {
        return form.valid && this.hasModelChanges();
    }

    public update() {
        this.carService.update(this.car)
            .subscribe(
            (response) => {
                this.isEditMode = !this.isEditMode;
                this.translate.get(['car.one', 'additional.update', 'success']).subscribe((res: string) => {
                    this.toastr.success(res['car.one'] + res['additional.update'], res['success']);
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
                this.carService.delete(this.car.id)
                    .subscribe(
                    () => {
                        this.translate.get(['car.one', 'additional.delete', 'success']).subscribe((res: string) => {
                            this.toastr.success(res['car.one'] + res['additional.delete'], res['success']);
                        });
                        EmitterService.get("CarSearchChanged").emit();
                    },
                    (error: ErrorHandlerModel) => {
                        this.errorHandlerService.showError(error);
                    });
            }
        });
    }
}