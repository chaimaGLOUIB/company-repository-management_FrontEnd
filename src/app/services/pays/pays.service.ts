import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  private basUrl = 'http://localhost:8080/';
  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getPayss(){
    return this.hhtpClient.get(this.basUrl+'Payss');
  }
  addPays(Pays){
    return this.hhtpClient.post(this.basUrl + 'Pays' , Pays);

  }
  updatePays(id: number,Pays: any){
    return this.hhtpClient.put(this.basUrl + "Pays/" + id, Pays);
  }
  
  deletePays(id :number){
    return this.hhtpClient.delete(this.basUrl + "Pays/" + id);

  }
  getpaysPage(page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'Pays/'+page+'/'+size);
  }
  getpaysByKeyword(mc:string,page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'pays/search/byNom?nom='+mc+'&page='+page+'&size='+size);
  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getPays(id){
  return this.hhtpClient.get(this.basUrl+"Pays/" + id);
}
 
}
