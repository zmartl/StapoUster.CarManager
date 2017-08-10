import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from "../core/guards/can-deactivate.guard";

import { PlanningOverview } from "./components/planning.overview";
import { PlanningAdd } from "./components/planning.add";

const routes: Routes = [
    {
        path: 'planning',
        component: PlanningOverview,
    },
    {
        path: 'planning/add',
        component: PlanningAdd,
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: 'planning/:id',
        component: PlanningAdd
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlanningRoutingModule { }