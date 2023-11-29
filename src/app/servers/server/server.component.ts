import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server-service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serverService:ServerService) { }

  ngOnInit() {
    this.server= this.serverService.getServer(1);
  }

}
