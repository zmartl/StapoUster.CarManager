import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core"
import { Response } from '@angular/http';

import { EmitterService } from "../../core/services/emitter.service";
import { CommonService } from "../../core/services/common.service";

import { ItemService } from '../../shared/services/item.service';
import { ItemSearchModel } from "../models/item.search.model";

@Component({
    selector: 'item-definition-list',
    templateUrl: '../templates/item.list.html'
})

export class ItemList implements OnInit, OnDestroy{
    @Input() searchOptions: ItemSearchModel = new ItemSearchModel(0, 20);
    @Output() totalCount = new EventEmitter();
    public items: any[] = [];
    private changeSubsrciption: any = null;

    constructor(private itemService: ItemService, private commonService: CommonService) { }

    ngOnInit(): void {
        this.changeSubsrciption = EmitterService.get("ItemSearchChanged").subscribe(() => this.getItems());        
    }

    ngOnDestroy(): void {
        this.changeSubsrciption.unsubscribe();
    }

    private getItems(): void {        
        this.itemService
            .getItems(this.searchOptions)
            .then((res) => {                
                this.items = res.json();                
                this.totalCount.emit(res.headers.get('X-TotalCount'));                
            });        
    }
}