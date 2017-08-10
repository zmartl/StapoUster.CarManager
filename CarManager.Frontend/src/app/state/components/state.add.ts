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

import { StateService } from "../../shared/services/state.service";
import { StateModel } from "../../shared/models/state.model";

@Component({
    selector: 'state-definition-add',
    templateUrl: '../templates/state.add.html'
})

export class StateAdd implements OnInit, CanComponentDeactivate {
    public state: StateModel;
    private stateCopy: StateModel;

    private routeSubscription: any;
    private isEditMode = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private stateService: StateService,
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
                    this.state = new StateModel();
                }

                this.copyInput();
            });        
    }

    private getItem(id: number): void {
        this.stateService
            .get(id)
            .subscribe(result => {
                this.state = result;
                this.copyInput();
            });
    }

    private copyInput() {
        this.stateCopy = _.cloneDeep(this.state);
    }

    public save(): void {
        if (!this.isEditMode) {
            this.stateService.add(this.state)
                .subscribe(
                (response) => {
                    this.translate.get(['state.one', 'additional.create', 'success']).subscribe((res: string) => {
                        this.toastr.success(res['state.one'] + res['additional.create'], res['success']);
                    });
                    this.copyInput(); // Set the Input to the Copy Object, then the unsavedChangedHandler doesn't show the dialog
                    this.location.back();
                },
                (error: ErrorHandlerModel) => {
                    this.errorHandlerService.showError(error);
                });
        } else {
            this.stateService.update(this.state)
                .subscribe(
                (response) => {
                    this.translate.get(['state.one', 'additional.update', 'success']).subscribe((res: string) => {
                        this.toastr.success(res['state.one'] + res['additional.update'], res['success']);
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
        if (!_.isEqual(this.state, this.stateCopy)) {
            let dialogRef = this.dialog.open(UnsavedChangesDialog);
            return dialogRef.afterClosed();
        } else {
            return true;
        }
    }
}