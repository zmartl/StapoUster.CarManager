import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core"

import { EmitterService } from "../../core/services/emitter.service";

import { StatisticService } from "../../shared/services/statistic.service";
import { StatisticModel} from "../../shared/models/statistic.model";

@Component( {
    selector: "statistic-overview",
    styleUrls: ['../templates/statistic.overview.scss'],
    templateUrl: "../templates/statistic.overview.html"
} )
export class StatisticOverview implements OnInit {
    addElementComponentIsVisible = false;
    statistics: StatisticModel[] = [];   
    totalCount: number;
    page = 0;

    constructor(private statisticService: StatisticService) {}

    ngOnInit(): void {             
        EmitterService.get("statisticSearchChanged").emit();        
    }

    private changestatisticSearch() {        
        EmitterService.get( "statisticSearchChanged" ).emit();
    }

    onAddButtonClicked() {
        this.addElementComponentIsVisible = !this.addElementComponentIsVisible;
    }
}