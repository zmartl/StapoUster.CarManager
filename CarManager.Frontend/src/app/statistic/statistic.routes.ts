import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from "../core/guards/can-deactivate.guard";

import { StatisticOverview } from "./components/statistic.overview";
import { StatisticAdd } from "./components/statistic.add";
import { StatisticEdit } from "./components/statistic.edit";

const routes: Routes = [
    {
        path: 'statistic',
        component: StatisticOverview,
    },
    {
        path: 'statistic/:id',
        component: StatisticEdit
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatisticRoutingModule { }