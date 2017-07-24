import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from "../core/guards/can-deactivate.guard";

import { StateOverview } from "./components/state.overview";
import { StateAdd } from "./components/state.add";

const routes: Routes = [
    {
        path: 'state',
        component: StateOverview,
    },
    {
        path: 'state/add',
        component: StateAdd,
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: 'state/:id',
        component: StateAdd
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StateRoutingModule { }