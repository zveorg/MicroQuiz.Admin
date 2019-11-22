import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from '@core/guards/auth.guard';


const routes: Routes = [
  {
    path: '', 
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'dashboard', 
        loadChildren: () =>
          import('@modules/dashboard/dashboard.module').then(m => m.DashboardModule) 
      }/*,
      { 
        path: 'quizzes', 
        component: QuizzesComponent 
      },
      { 
        path: 'quiz/create', 
        component: QuizCreateComponent 
      },
      { 
        path: 'quiz/:id/edit', 
        component: QuizEditComponent 
      }*/
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@modules/auth/auth.module').then(m => m.AuthModule)
  },  
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
