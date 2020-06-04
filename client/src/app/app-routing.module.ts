import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/authentication/home', pathMatch: 'full' },
  {
    path: 'authentication', 
    loadChildren: () => import('modules/authentication/authentication.module')
    .then((module) => module.AuthenticationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
