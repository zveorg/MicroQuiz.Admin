import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationService } from './services';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ApiPrefixInterceptor } from './interceptors/api-prefix.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TitleCasePipe } from '@angular/common';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    TitleCasePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}