import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ServerService } from "../server-service";
import { Observable } from "rxjs/internal/Observable";

interface Server{
    id:number;
    name:string;
    status:string;
}

@Injectable()
export class ServerResolver implements Resolve<Server>{
    constructor(private serverService:ServerService){}

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<Server> |
    Promise<Server> | Server{
        return this.serverService.getServer(+route.params['id']);
    } 
}
