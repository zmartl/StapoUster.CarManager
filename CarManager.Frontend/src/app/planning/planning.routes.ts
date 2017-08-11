import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from "../core/guards/can-deactivate.guard";

import { PlanningOverview } from "./components/planning.overview";
import { PlanningAdd } from "./components/planning.add";
import { PlanningEdit } from "./components/planning.edit";

const routes: Routes = [
    {
        path: 'planning',
        component: PlanningOverview,
    },
    {
        path: 'planning/:id',
        component: PlanningEdit
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlanningRoutingModule { }