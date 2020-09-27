import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportService {
  private basUrl = 'http://localhost:8080/';
  IdSource = new  BehaviorSubject<number>(0);
  Id1Source= new  BehaviorSubject<number>(0);
  RapportSource = new  BehaviorSubject<any>(0);
  IdData:any;
  Id1Data:any;
  RapportData:any;
  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
    this.Id1Data= this.Id1Source.asObservable();
    this.RapportData= this.RapportSource.asObservable();

  }

  getRapports(){
    return this.hhtpClient.get(this.basUrl+'Rapports');
  }
  getRapportByDateAndNum(date : Date, numPoste:number){
    return this.hhtpClient.get(this.basUrl+'RapportByDateAndNum?Date='+date+'&NumPoste='+numPoste);
  }
  addRapport(Rapport){
    return this.hhtpClient.post(this.basUrl + 'Rapport' , Rapport);

  }
  updateRapport(id: number,Rapport: any){
    return this.hhtpClient.put(this.basUrl + 'Rapport/' + id, Rapport);
  }
  deleteRapport(id :number){
    return this.hhtpClient.delete(this.basUrl + "Rapport/" + id);

  }
  changeId(postId: number,id){
    this.IdSource.next(postId);
    this.Id1Source.next(id)
}
sendRapport(Rapport: any){
  this.RapportSource.next(Rapport);
}
getRapportsPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Rapports?page='+page+'&size='+size);
}
getRapportsPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Rapports/'+page+'/'+size);
}
getRapportsByKeyword(mc:Date,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Rapport/search/byDate?date='+mc+'&page='+page+'&size='+size);
}
getRapport(id){
  return this.hhtpClient.get(this.basUrl+"Rapport/" + id);
}

}
