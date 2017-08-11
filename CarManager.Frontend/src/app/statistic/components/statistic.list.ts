import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core"
import { Response } from '@angular/http';

import { EmitterService } from "../../core/services/emitter.service";
import { CommonService } from "../../core/services/common.service";

import { StatisticService } from '../../shared/services/statistic.service';

@Component({
    selector: 'statistic-list',
    templateUrl: '../templates/statistic.list.html'
})

export class StatisticList implements OnInit, OnDestroy{
    @Output() totalCount = new EventEmitter();
    public statistics: any[] = [];
    private changeSubsrciption: any = null;

    constructor(private statisticService: StatisticService, private commonService: CommonService) { }

    ngOnInit(): void {        
        this.getItems();
        this.changeSubsrciption = EmitterService.get("StatisticSearchChanged").subscribe(() => this.getItems());        
    }

    ngOnDestroy(): void {
        this.changeSubsrciption.unsubscribe();
    }

    private getItems(): void {
        this.statisticService
            .getStatistics()
            .then((res) => {                
                this.statistics = res.json();                
                this.totalCount.emit(res.headers.get('X-TotalCount'));                
            });        
    }
}