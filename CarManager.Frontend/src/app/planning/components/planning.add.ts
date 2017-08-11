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

import { PlanningService } from "../../shared/services/planning.service";
import { PlanningModel } from "../../shared/models/planning.model";

import { CarModel } from "../../shared/models/car.model";
import { CarService } from "../../shared/services/car.service";

import { StateModel } from "../../shared/models/state.model";
import { StateService } from "../../shared/services/state.service";

@Component({
    selector: 'planning-add',
    templateUrl: '../templates/planning.add.html'
})

export class PlanningAdd implements OnInit, CanComponentDeactivate {

    datePickerConfig: IDatePickerConfig = {
        firstDayOfWeek: 'mo',
        locale: 'de',
        format: 'DD.MM.YYYY'
    };

    public planning: PlanningModel;
    private planningCopy: PlanningModel;

    private routeSubscription: any;
    private isEditMode = false;

    cars: CarModel[] = [];
    states: StateModel[] = [];    

    constructor(
        private activatedRoute: ActivatedRoute,
        private planningService: PlanningService,
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
                    this.planning = new PlanningModel();
                }

                this.copyInput();
            });        

        this.getCars();
        this.getStates();
    }

    private getCars() {
        this.carService.getCars().then((output) => {
            this.cars = output.json();
        });
    }

    private setSelectedCar(car: CarModel): boolean {
        if (this.planning.car.id == null) return false;
        return this.planning.car === car;
    }

    private onCarChanged() {
        this.planning.car = this.cars.find(x => x.id === this.planning.car.id);
    }

    private getStates() {
        this.stateService.getStates().then((output) => {
            this.states = output.json();
        });
    }

    private setSelectedState(state: StateModel): boolean {
        if (this.planning.state.id == null) return false;
        return this.planning.state === state;
    }

    private onStateChanged() {
        this.planning.state = this.states.find(x => x.id === this.planning.state.id);
    }

    private getItem(id: number): void {
        this.planningService
            .get(id)
            .subscribe(result => {
                this.planning = result;
                this.copyInput();
            });
    }

    private copyInput() {
        this.planningCopy = _.cloneDeep(this.planning);
    }

    public save(): void {

        this.planning.startTime = moment(this.planning.startTime, 'DD.MM.YYYY').format('YYYY.MM.DD'); 
        this.planning.endTime = moment(this.planning.endTime, 'DD.MM.YYYY').format('YYYY.MM.DD'); 

         this.planningService.add(this.planning)
             .subscribe(
             (response) => {
                 this.translate.get(['planning.one', 'additional.create', 'success']).subscribe((res: string) => {
                     this.toastr.success(res['planning.one'] + res['additional.create'], res['success']);
                 });
                 this.copyInput(); // Set the Input to the Copy Object, then the unsavedChangedHandler doesn't show the dialog
                 EmitterService.get("PlanningAdded").emit();
                 EmitterService.get("PlanningSearchChanged").emit();
             },
             (error: ErrorHandlerModel) => {
                 this.errorHandlerService.showError(error);
             });        
    }

    canDeactivate(): Observable<boolean> | boolean {
        if (!_.isEqual(this.planning, this.planningCopy)) {
            let dialogRef = this.dialog.open(UnsavedChangesDialog);
            return dialogRef.afterClosed();
        } else {
            return true;
        }
    }
}