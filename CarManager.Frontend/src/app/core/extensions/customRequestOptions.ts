import { BaseRequestOptions } from '@angular/http';

/*  Change the Request Header for every HTML request
    HowTo Telling Angular to provide an instance of CustomRequestOptions whenever someone injects RequestOptions
    ->  providers: [{ provide: RequestOptions, useClass: CustomRequestOptions }]
*/
export class CustomRequestOptions extends BaseRequestOptions {
    constructor() {
        super();
        this.headers.append('If-Modified-Since', 'Mon, 26 Jul 1997 05:00:00 GMT');
        this.headers.append('Cache-Control', 'no-cache');
        this.headers.append('Pragma', 'no-cache');
    }
}