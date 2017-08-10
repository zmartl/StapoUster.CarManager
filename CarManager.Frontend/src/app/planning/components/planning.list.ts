import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core"
import { Response } from '@angular/http';

import { EmitterService } from "../../core/services/emitter.service";
import { CommonService } from "../../core/services/common.service";

import { PlanningService } from '../../shared/services/planning.service';

@Component({
    selector: 'planning-list',
    templateUrl: '../templates/planning.list.html'
})

export class PlanningList implements OnInit, OnDestroy{
    @Output() totalCount = new EventEmitter();
    public plannings: any[] = [];
    private changeSubsrciption: any = null;

    constructor(private planningService: PlanningService, private commonService: CommonService) { }

    ngOnInit(): void {        
        this.getItems();
        this.changeSubsrciption = EmitterService.get("PlanningSearchChanged").subscribe(() => this.getItems());        
    }

    ngOnDestroy(): void {
        this.changeSubsrciption.unsubscribe();
    }

    private getItems(): void {
        this.planningService
            .getPlannings()
            .then((res) => {                
                this.plannings = res.json();                
                this.totalCount.emit(res.headers.get('X-TotalCount'));                
            });        
    }
}