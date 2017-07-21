import { NgModule }       from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotAuthorizedComponent } from './not-authorized.component';

const routes: Routes = [
    { path: '401', component: NotAuthorizedComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotAuthorizedRoutingModule { }