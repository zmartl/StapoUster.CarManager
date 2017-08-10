import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from "../core/guards/can-deactivate.guard";

import { CarOverview } from "./components/car.overview";
import { CarAdd } from "./components/car.add";

const routes: Routes = [
    {
        path: 'car',
        component: CarOverview,
    },
    {
        path: 'car/add',
        component: CarAdd,
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: 'car/:id',
        component: CarAdd
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarRoutingModule { }