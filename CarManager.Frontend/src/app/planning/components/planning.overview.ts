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
    addElementComponentIsVisible = false;
    plannings: PlanningModel[] = [];   
    totalCount: number;
    page = 0;

    constructor(private planningService: PlanningService) {}

    ngOnInit(): void {             
        EmitterService.get("PlanningSearchChanged").emit();
        EmitterService.get("PlanningAdded").subscribe(() => this.onAddButtonClicked());        
    }

    private changePlanningSearch() {        
        EmitterService.get( "PlanningSearchChanged" ).emit();
    }

    onAddButtonClicked() {
        this.addElementComponentIsVisible = !this.addElementComponentIsVisible;
    }
}