import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AuthRoutes } from './auth.routing';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
    declarations: [
        LoginComponent,
        LogoutComponent
    ],
    imports: [
        AuthRoutes,
        SharedModule
    ]
})
export class AuthModule { }