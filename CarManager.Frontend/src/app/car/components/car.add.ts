import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { MdSlideToggleChange, MdDialog } from "@angular/material";

import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from 'ng2-translate';
import { ToastrService } from 'ngx-toastr';

import { CanComponentDeactivate } from "../../core/guards/can-deactivate.guard";
import { UnsavedChangesDialog } from "../../core/modules/unsavedChangesDialog/unsavedChangesDialog.component";
import { EmitterService } from "../../core/services/emitter.service";
import { ErrorHandlerModel, ErrorMode } from "../../core/models/errorHandler.model";
import { CommonService } from "../../core/services/common.service";
import { ErrorHandlerService } from "../../core/services/errorHandler.service";

import { CarService } from "../../shared/services/car.service";
import { CarModel } from "../../shared/models/car.model";

@Component({
    selector: 'car-definition-add',
    templateUrl: '../templates/car.add.html'
})

export class CarAdd implements OnInit, CanComponentDeactivate {
    public car: CarModel;
    private carCopy: CarModel;

    private routeSubscription: any;
    private isEditMode = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private carService: CarService,
        private commonService: CommonService,
        private translate: TranslateService,
        private toastr: ToastrService,
        private dialog: MdDialog,
        private location: Location,
        private errorHandlerService: ErrorHandlerService) { }

    ngOnInit(): void {
        this.activatedRoute.params
            .map((params: Params) => params["id"])
            .subscribe((output) => {
                if (output !== undefined) {
                    this.isEditMode = true;
                    this.getItem(+output); // (+) converts string 'id' to a number
                } else {
                    this.car = new CarModel();
                }

                this.copyInput();
            });        
    }

    private getItem(id: number): void {
        this.carService
            .get(id)
            .subscribe(result => {
                this.car = result;
                this.copyInput();
            });
    }

    private copyInput() {
        this.carCopy = _.cloneDeep(this.car);
    }

    public save(): void {
        if (!this.isEditMode) {
            this.carService.add(this.car)
                .subscribe(
                (response) => {
                    this.translate.get(['car.one', 'additional.create', 'success']).subscribe((res: string) => {
                        this.toastr.success(res['car.one'] + res['additional.create'], res['success']);
                    });
                    this.copyInput(); // Set the Input to the Copy Object, then the unsavedChangedHandler doesn't show the dialog
                    this.location.back();
                },
                (error: ErrorHandlerModel) => {
                    this.errorHandlerService.showError(error);
                });
        } else {
            this.carService.update(this.car)
                .subscribe(
                (response) => {
                    this.translate.get(['car.one', 'additional.update', 'success']).subscribe((res: string) => {
                        this.toastr.success(res['car.one'] + res['additional.update'], res['success']);
                    });
                    this.copyInput(); // Set the Input to the Copy Object, then the unsavedChangedHandler doesn't show the dialog
                    this.location.back();
                },
                (error: ErrorHandlerModel) => {
                    this.errorHandlerService.showError(error);
                });
        }
    }

    canDeactivate(): Observable<boolean> | boolean {
        if (!_.isEqual(this.car, this.carCopy)) {
            let dialogRef = this.dialog.open(UnsavedChangesDialog);
            return dialogRef.afterClosed();
        } else {
            return true;
        }
    }
}