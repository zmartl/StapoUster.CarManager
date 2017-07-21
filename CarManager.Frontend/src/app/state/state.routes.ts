import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "../core/guards/auth.guard";
import { CanDeactivateGuard } from "../core/guards/can-deactivate.guard";

import { StateOverview } from "./components/state.overview";
import { StateAdd } from "./components/state.add";

const routes: Routes = [
    {
        path: 'state',
        component: ItemOverview,
        canActivate: [AuthGuard]
    },
    {
        path: 'state/add',
        component: StateAdd,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: 'state/:id',
        component: ItemAdd
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemRoutingModule { }