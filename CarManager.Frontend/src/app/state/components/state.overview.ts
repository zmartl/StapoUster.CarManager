import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core"

import { EmitterService } from "../../core/services/emitter.service";

import { StateService } from "../../shared/services/state.service";
import {StateModel} from "../../shared/models/state.model";

@Component( {
    selector: "state-overview",
    styleUrls: ['../templates/state.overview.scss'],
    templateUrl: "../templates/state.overview.html"
} )
export class StateOverview implements OnInit {
    states: StateModel[] = [];   
    totalCount: number;
    page = 0;

    constructor(private stateService: StateService) {}

    ngOnInit(): void {             
        EmitterService.get("StateSearchChanged").emit();        
    }

    private changeStateSearch() {        
        EmitterService.get( "StateSearchChanged" ).emit();
    }
}