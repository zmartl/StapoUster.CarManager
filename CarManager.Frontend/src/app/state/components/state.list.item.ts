import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TranslateService } from 'ng2-translate';
import { ToastrService } from 'ngx-toastr';
import { MdDialog } from '@angular/material';

import * as _ from 'lodash';

import { CommonService } from "../../core/services/common.service";
import { EmitterService } from "../../core/services/emitter.service";
import { ErrorHandlerModel, ErrorMode } from "../../core/models/errorHandler.model";

import { ErrorHandlerService } from "../../core/services/errorHandler.service";

import { PositionService } from "../../shared/services/position.service";
import { ItemService } from "../../shared/services/item.service";
import {DeleteDialog} from "../../core/modules/deleteDialog/deleteDialog.component";
import {ItemModel} from "../../shared/models/item.model";

@Component({
    selector: '[item-definition-list-item]',
    templateUrl: '../templates/item.list.item.html'
})

export class ItemListItem {
    @Input() item: ItemModel;
    private itemCopy: ItemModel;

    public isEditMode: boolean = false;

    constructor(public itemService: ItemService, private translate: TranslateService, private toastr: ToastrService, private commonService: CommonService, private dialog: MdDialog, private errorHandlerService: ErrorHandlerService) {}

    public setEdit() {
        this.isEditMode = !this.isEditMode;
        this.copyInput();
    }

    public resetEdit() {
        this.isEditMode = !this.isEditMode;
        this.item = this.itemCopy;
    }

    private copyInput() {
        this.itemCopy = _.cloneDeep(this.item);
    }

    private hasModelChanges(): boolean {
        return !_.isEqual(this.item, this.itemCopy);
    }

    public canSave(form): boolean {
        return form.valid && this.hasModelChanges();
    }

    public update() {
        this.itemService.update(this.item)
            .subscribe(
            (response) => {
                this.isEditMode = !this.isEditMode;
                this.translate.get(['itemDefinition', 'additional.update', 'success']).subscribe((res: string) => {
                    this.toastr.success(res['itemDefinition'] + res['additional.update'], res['success']);
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
                this.itemService.delete(this.item.itemDefinitionId)
                    .subscribe(
                    () => {
                        this.translate.get(['itemDefinition', 'additional.delete', 'success']).subscribe((res: string) => {
                            this.toastr.success(res['itemDefinition'] + res['additional.delete'], res['success']);
                        });
                        EmitterService.get("ItemSearchChanged").emit();
                    },
                    (error: ErrorHandlerModel) => {
                        this.errorHandlerService.showError(error);
                    });
            }
        });
    }

    public toggleActive() {
        this.itemService.toggleActive(this.item.itemDefinitionId)
            .subscribe(() => {
                EmitterService.get("ItemSearchChanged").emit();
            },
            (error: ErrorHandlerModel) => {
                this.errorHandlerService.showError(error);
            });
    }
}