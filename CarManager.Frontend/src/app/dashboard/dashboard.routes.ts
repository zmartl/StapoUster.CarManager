import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from "../core/guards/can-deactivate.guard";

import { DashboardOverview } from "./components/dashboard.overview";

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardOverview,
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }