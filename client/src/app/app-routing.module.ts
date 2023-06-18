import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RoutingGuard } from 'src/shared/guards/routing-guard/routing.guard';


const routes: Routes = [

  // Home Route
  { path: '', redirectTo: '/authentication/home', pathMatch: 'full'},

  // Authentication Routes
  {
    path: 'authentication', 
    loadChildren: () => import('modules/authentication/authentication.module')
    .then((module) => module.AuthenticationModule),
    canActivate: [RoutingGuard]
  },

  // Dashboard Routes
  {
    path: 'dashboard', 
    loadChildren: () => import('modules/dashboard/dashboard.module')
    .then((module) => module.DashboardModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
