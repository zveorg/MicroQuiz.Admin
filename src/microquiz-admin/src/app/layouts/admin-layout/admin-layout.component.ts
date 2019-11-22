import { Component } from '@angular/core';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
    public sidebarMinimized = true;
    private changes: MutationObserver;
    public element: HTMLElement = document.body;

    public navItems = [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: "fa fa-tachometer"
        },
        {
            name: "Quizzes",
            url: "/quizzes",
            icon: "fa fa-question"
        },
        {
            title: true,
            name: ""
        },
        {
            name: "Log Out",
            url: "/auth/logout",
            icon: "fa fa-sign-out"
        }
    ];
    

    constructor() {
        this.changes = new MutationObserver(() => {
            this.sidebarMinimized = document.body.classList.contains("sidebar-minimized");
        });

        this.changes.observe(<Element>this.element, {
            attributes: true
        });
    }
}