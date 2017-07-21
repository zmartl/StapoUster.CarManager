import { Injectable, Inject } from "../../../../node_modules/@angular/core/index";
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from "../../../../node_modules/@angular/router/index";
import { APP_CONFIG_TOKEN } from "../../shared/settings/appConfig";
import { IAppConfig } from "../../shared/settings/appConfig.interface";

import {AccountService} from "../../shared/services/account.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private accountService: AccountService,
        @Inject(APP_CONFIG_TOKEN) private appConfig: IAppConfig
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {

        if (this.appConfig.isUserAuthorized) {
            return true;
        }

        return this.accountService.getMyUser()
            .then((res) => {
                this.appConfig.isUserAuthorized = true;
                return true;
            } )
            .catch((e) => {
                if (e.status === 401) {
                    this.router.navigate(['/401']);
                }
                return false;
            } );
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}