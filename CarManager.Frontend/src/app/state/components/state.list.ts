import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core"
import { Response } from '@angular/http';

import { EmitterService } from "../../core/services/emitter.service";
import { CommonService } from "../../core/services/common.service";

import { StateService } from '../../shared/services/state.service';

@Component({
    selector: 'state-list',
    templateUrl: '../templates/state.list.html'
})

export class StateList implements OnInit, OnDestroy{
    @Output() totalCount = new EventEmitter();
    public states: any[] = [];
    private changeSubsrciption: any = null;

    constructor(private stateService: StateService, private commonService: CommonService) { }

    ngOnInit(): void {
        console.log("onInit List called");
        this.getItems();
        this.changeSubsrciption = EmitterService.get("StateSearchChanged").subscribe(() => this.getItems());        
    }

    ngOnDestroy(): void {
        this.changeSubsrciption.unsubscribe();
    }

    private getItems(): void {
        console.warn("getItems() called");
        this.stateService
            .getStates()
            .then((res) => {                
                this.states = res.json();                
                this.totalCount.emit(res.headers.get('X-TotalCount'));                
            });        
    }
}