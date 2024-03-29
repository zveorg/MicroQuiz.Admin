import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@core/services';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() { 
        this.authenticationService.logout();
        this.router.navigate(['/auth/login']);
    }
}