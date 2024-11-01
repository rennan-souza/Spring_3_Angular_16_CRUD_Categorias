import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AppLayoutComponent } from './views/app-layout/app-layout.component';
import { HomeComponent } from './views/home/home.component';
import { CategoriasComponent } from './views/categorias/categorias.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: "", component: AppLayoutComponent, children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "categorias", component: CategoriasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
