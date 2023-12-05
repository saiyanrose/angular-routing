import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServerService } from './servers/server-service';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { CanDeactivateGuard } from './servers/edit-server/canDeactivateGuard';
import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes:Routes=[
  {path:'',component:HomeComponent},
  {path:'users',component:UsersComponent,children:[
    {path:':id/:name',component:UserComponent}
  ]},  
  {path:'servers',canActivate:[AuthGuard],canActivateChild:[AuthGuard], component:ServersComponent,children:[
    {path:':id',component:ServerComponent,resolve:{server:ServerResolver}},
    {path:':id/edit',component:EditServerComponent,canDeactivate:[CanDeactivateGuard]}
  ]},
  {path:'not-found',component:PageNotFoundComponent},
  {path:'**',redirectTo:'/not-found'}  
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServersComponent,
    UsersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,FormsModule,RouterModule.forRoot(appRoutes,{useHash:true})
  ],
  providers: [ServerService,AuthGuard,AuthService,CanDeactivateGuard,ServerResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
