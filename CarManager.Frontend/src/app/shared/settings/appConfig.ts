import { IAppConfig } from './appConfig.interface';
import { OpaqueToken } from '@angular/core';

export let APP_CONFIG_TOKEN = new OpaqueToken("app.config");

export const APP_CONFIG: IAppConfig = {
    isUserAuthorized: false
};