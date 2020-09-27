import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getClients(){
    return this.hhtpClient.get(this.basUrl+'Clients');
  }
  addClient(Client){
    return this.hhtpClient.post(this.basUrl + 'Client' , Client);

  }
  updateClient(id: number,Client: any){
    return this.hhtpClient.put(this.basUrl + "Client/" + id, Client);
  }
  deleteClient(id :number){
    return this.hhtpClient.delete(this.basUrl + "Client/" + id);

  }
 
  changeId(postId: number){
    this.IdSource.next(postId);
}
getclientsPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'clients?page='+page+'&size='+size);
}
getclientsPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Clients/'+page+'/'+size);
}
getclientsByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Client/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getClient(id){
  return this.hhtpClient.get(this.basUrl+"Client/" + id);
}
}
