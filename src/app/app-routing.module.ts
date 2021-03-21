import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListCreatorComponent } from './components/list-creator/list-creator.component';
import { ListComponent } from './components/list/list.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard]
  },
  {
    path: 'lists/:id', component: ListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'new', component: ListCreatorComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
