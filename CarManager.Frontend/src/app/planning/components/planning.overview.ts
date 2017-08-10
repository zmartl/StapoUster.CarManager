import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core"

import { EmitterService } from "../../core/services/emitter.service";

import { PlanningService } from "../../shared/services/planning.service";
import {PlanningModel} from "../../shared/models/planning.model";

@Component( {
    selector: "planning-overview",
    styleUrls: ['../templates/planning.overview.scss'],
    templateUrl: "../templates/planning.overview.html"
} )
export class PlanningOverview implements OnInit {
    plannings: PlanningModel[] = [];   
    totalCount: number;
    page = 0;

    constructor(private planningService: PlanningService) {}

    ngOnInit(): void {             
        EmitterService.get("PlanningSearchChanged").emit();        
    }

    private changePlanningSearch() {        
        EmitterService.get( "PlanningSearchChanged" ).emit();
    }
}