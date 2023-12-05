import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate, CanDeactivateGuard } from './canDeactivateGuard';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit,CanComponentDeactivate {
  serverName:string='';
  serverStatus:string='';
  changedSave=false;
  public servers: {id: number, name: string, status: string};

  constructor(private serverService:ServerService,private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();

    const id=+this.route.snapshot.params['id'];    

    this.servers = this.serverService.getServer(id);    

    this.serverName = this.servers.name;
    this.serverStatus = this.servers.status;    
  }

  onUpdateServer(){
    this.serverService.updateServer(this.servers.id, {name: this.serverName, status: this.serverStatus});
    this.changedSave=true;
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  canDeactivate():Observable<boolean> | Promise<boolean> | boolean{
    if(this.changedSave){
      return confirm('Do you want to discard the changes?');
    }else{
      true;
    }
  }

}
