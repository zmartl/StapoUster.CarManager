import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core"

import { EmitterService } from "../../core/services/emitter.service";

import { RunwayService } from "../../shared/services/runway.service";
import { ItemSearchModel } from "../models/item.search.model";
import { ItemService } from "../../shared/services/item.service";
import { SearchModel } from "../../shared/models/search.model";
import {ItemModel} from "../../shared/models/item.model";

@Component( {
    selector: "item-definition-overview",
    styleUrls: ['../templates/item.overview.scss'],
    templateUrl: "../templates/item.overview.html"
} )
export class ItemOverview implements OnInit {
    items: ItemModel[] = [];
    searchOptions = new ItemSearchModel(0, 20);
    totalCount: number;
    page = 0;

    constructor(private itemService: ItemService) {}

    ngOnInit(): void {       
        EmitterService.get( "ItemSearchChanged" ).emit();
    }


    private changeSearchTerm(term: string) {
        this.searchOptions.searchTerm = term;
        this.changeItemSearch();
    }

    private changeItemSearch() {
        this.searchOptions.start = (this.page - 1) * this.searchOptions.pageSize;
        EmitterService.get( "ItemSearchChanged" ).emit();
    }
}