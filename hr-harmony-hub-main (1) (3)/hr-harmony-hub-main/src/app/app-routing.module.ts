import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UploadCvComponent } from './upload-cv/upload-cv.component';

const routes: Routes = [
  {path: '', redirectTo: 'homepage' , pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  { path: 'reset-password', component: ResetPasswordComponent },
  { path:'upload-cv',component: UploadCvComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
