import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { faAsterisk } from '@fortawesome/free-solid-svg-icons';

import { AuthenticationService } from '@core/services';
import { ILoginRequest } from '@core/models/login.request';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    error: string;
    isLoading: boolean;
    loginForm: FormGroup;

    faAsterisk = faAsterisk;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() { }

    get f() {
        return this.loginForm.controls;
    }

    login() {
        const credentials : ILoginRequest = this.loginForm.value;
        this.isLoading = true;

        this.authenticationService.login(credentials)
            .pipe(
                tap(_ => this.router.navigate(['/dashboard'])),
                finalize(() => this.isLoading = false),
                catchError(error => of(this.error = error))
            ).subscribe();
    }
}