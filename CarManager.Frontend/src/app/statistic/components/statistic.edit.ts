import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { MdSlideToggleChange, MdDialog } from "@angular/material";

import { IDatePickerConfig, DatePickerComponent, DatePickerDirective } from 'ng2-date-picker';
import * as moment from 'moment';

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

import { StatisticService } from "../../shared/services/statistic.service";
import { StatisticModel } from "../../shared/models/statistic.model";

import { CarModel } from "../../shared/models/car.model";
import { CarService } from "../../shared/services/car.service";

import { StateModel } from "../../shared/models/state.model";
import { StateService } from "../../shared/services/state.service";

@Component({
    selector: 'statistic-definition-edit',
    templateUrl: '../templates/statistic.edit.html'
})

export class StatisticEdit implements OnInit, CanComponentDeactivate {

    datePickerConfig: IDatePickerConfig = {
        firstDayOfWeek: 'mo',
        locale: 'de',
        format: 'DD.MM.YYYY'
    };

    public statistic: StatisticModel;
    private statisticCopy: StatisticModel;

    private routeSubscription: any;
    private isEditMode = false;

    cars: CarModel[] = [];
    states: StateModel[] = [];    

    constructor(
        private activatedRoute: ActivatedRoute,
        private statisticService: StatisticService,
        private carService: CarService,
        private stateService: StateService,
        private commonService: CommonService,
        private translate: TranslateService,
        private toastr: ToastrService,
        private dialog: MdDialog,
        private location: Location,
        private errorHandlerService: ErrorHandlerService) {}

    ngOnInit(): void {
        this.activatedRoute.params
            .map((params: Params) => params["id"])
            .subscribe((output) => {
                if (output !== undefined) {
                    this.isEditMode = true;
                    this.getItem(+output); // (+) converts string 'id' to a number
                } else {
                    this.statistic = new StatisticModel();
                }

                this.copyInput();
            }); 

        //this.statistic.endTime = moment(this.statistic.endTime).format('YYYY.MM.DD');

        this.getCars();
        this.getStates();
    }

    private getCars() {
        this.carService.getCars().then((output) => {
            this.cars = output.json();
        });
    }

    private setSelectedCar(car: CarModel): boolean {
        if (this.statistic.car.id == null) return false;
        return this.statistic.car === car;
    }

    private onCarChanged() {
        this.statistic.car = this.cars.find(x => x.id === this.statistic.car.id);
    }

    private getStates() {
        this.stateService.getStates().then((output) => {
            this.states = output.json();
        });
    }

    private getItem(id: number): void {
        this.statisticService
            .get(id)
            .subscribe(result => {
                this.statistic = result;
                this.statistic.startDate = moment(this.statistic.startDate).format('DD.MM.YYYY');
                this.statistic.endDate = moment(this.statistic.endDate).format('DD.MM.YYYY');
                this.copyInput();
            });
    }

    private copyInput() {
        this.statisticCopy = _.cloneDeep(this.statistic);
    }

    public save(): void {

        this.statistic.startDate = moment(this.statistic.startDate, 'DD.MM.YYYY').format('YYYY.MM.DD'); 
        this.statistic.endDate = moment(this.statistic.endDate, 'DD.MM.YYYY').format('YYYY.MM.DD'); 

        this.statisticService.update(this.statistic)
            .subscribe(
            (response) => {
                this.translate.get(['statistic.one', 'additional.update', 'success']).subscribe((res: string) => {
                    this.toastr.success(res['statistic.one'] + res['additional.update'], res['success']);
                });
                this.copyInput(); // Set the Input to the Copy Object, then the unsavedChangedHandler doesn't show the dialog
                this.location.back();
            },
            (error: ErrorHandlerModel) => {
                this.errorHandlerService.showError(error);
                });
    }

    canDeactivate(): Observable<boolean> | boolean {
        if (!_.isEqual(this.statistic, this.statisticCopy)) {
            let dialogRef = this.dialog.open(UnsavedChangesDialog);
            return dialogRef.afterClosed();
        } else {
            return true;
        }
    }
}