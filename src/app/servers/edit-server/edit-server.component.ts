import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server-service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  serverName:string='';
  serverStatus:string='';
  public servers: {id: number, name: string, status: string};

  constructor(private serverService:ServerService) { }

  ngOnInit() {
    this.servers = this.serverService.getServer(1);
    this.serverName = this.servers.name;
    this.serverStatus = this.servers.status;
  }

  onUpdateServer(){
    this.serverService.updateServer(this.servers.id, {name: this.serverName, status: this.serverStatus});
  }

}
