import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppareilService {
  private basUrl = 'http://localhost:8080/';
  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }

  getAppareils(){
    return this.hhtpClient.get(this.basUrl+'Appareils');
  }
  addAppareil(appareil){
    return this.hhtpClient.post(this.basUrl + 'Appareil' , appareil);

  }
  updateAppareil(id: number,appareil: any){
    return this.hhtpClient.put(this.basUrl + 'Appareil/' + id, appareil);
  }
  deleteAppareil(id :number){
    return this.hhtpClient.delete(this.basUrl + "Appareil/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getappareilsPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'appareils?page='+page+'&size='+size);
}
getappareilsPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Appareils/'+page+'/'+size);
}
getappareilsByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Appareil/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getAppareil(id){
  return this.hhtpClient.get(this.basUrl+"Appareil/" + id);
}
}
