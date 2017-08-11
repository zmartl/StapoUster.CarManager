import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core"

import { EmitterService } from "../../core/services/emitter.service";

import { PlanningService } from "../../shared/services/planning.service";
import { PlanningModel} from "../../shared/models/planning.model";

@Component( {
    selector: "dashboard-overview",
    styleUrls: ['../templates/dashboard.overview.scss'],
    templateUrl: "../templates/dashboard.overview.html"
} )
export class DashboardOverview implements OnInit {
    addElementComponentIsVisible = false;
    count = 0;
    plannings: PlanningModel[] = [];   
    totalCount: number;
    page = 0;

    constructor(private planningService: PlanningService) {}

    ngOnInit(): void {
        this.getPlannings();       
    }

    getPlannings() {
        this.planningService
            .getNowPlannedPlannings()
            .then((res) => {
            this.plannings = res.json();
        })
    }
}