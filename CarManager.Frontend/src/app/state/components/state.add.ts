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

import { ItemService } from "../../shared/services/item.service";
import {ItemModel} from "../../shared/models/item.model";

@Component({
    selector: 'item-definition-add',
    templateUrl: '../templates/item.add.html'
})

export class ItemAdd implements OnInit, CanComponentDeactivate {
    public item: ItemModel;
    private itemCopy: ItemModel;

    private routeSubscription: any;
    private isEditMode = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private itemService: ItemService,
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
                    this.item = new ItemModel();
                }

                this.copyInput();
            });        
    }

    private getItem(id: number): void {
        this.itemService
            .get(id)
            .subscribe(result => {
                this.item = result;
                this.copyInput();
            });
    }

    private copyInput() {
        this.itemCopy = _.cloneDeep(this.item);
    }

    private changeActiveState($event: MdSlideToggleChange): void {
        this.item.isDeleted = $event.checked;
    }

    public save(): void {
        if (!this.isEditMode) {
            this.itemService.add(this.item)
                .subscribe(
                (response) => {
                    this.translate.get(['itemDefinition', 'additional.create', 'success'])
                        .subscribe((res: string) => {
                            this.toastr.success(res['itemDefinition'] + res['additional.create'],
                                res['success']);
                        });
                    this.copyInput(); // Set the Input to the Copy Object, then the unsavedChangedHandler doesn't show the dialog
                    this.location.back();
                },
                (error: ErrorHandlerModel) => {
                    this.errorHandlerService.showError(error);
                });
        } else {
            this.itemService.update(this.item)
                .subscribe(
                (response) => {
                    this.translate.get(['itemDefinition', 'additional.update', 'success'])
                        .subscribe((res: string) => {
                            this.toastr.success(res['itemDefinition'] + res['additional.update'],
                                res['success']);
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
        if (!_.isEqual(this.item, this.itemCopy)) {
            let dialogRef = this.dialog.open(UnsavedChangesDialog);
            return dialogRef.afterClosed();
        } else {
            return true;
        }
    }
}