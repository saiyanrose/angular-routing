import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server-service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serverService:ServerService,private route:ActivatedRoute) { }

  ngOnInit() {
    const id=+this.route.snapshot.params['id'];//id as number
    
    this.server= this.serverService.getServer(id);

    this.route.params.subscribe((params:Params)=>{
      this.server= this.serverService.getServer(+params['id']);
    })
  }

}
