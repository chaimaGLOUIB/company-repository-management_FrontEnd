import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportBService {
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

  getRapportBs(){
    return this.hhtpClient.get(this.basUrl+'RapportBs');
  }
  addRapportB(RapportB){
    return this.hhtpClient.post(this.basUrl + 'RapportB' , RapportB);

  }
  updateRapportB(id: number,RapportB: any){
    return this.hhtpClient.put(this.basUrl + 'RapportB/' + id, RapportB);
  }
  deleteRapportB(id :number){
    return this.hhtpClient.delete(this.basUrl + "RapportB/" + id);

  }
  changeId(postId: number,id){
    this.IdSource.next(postId);
    this.Id1Source.next(id)
}
sendRapport(Rapport: any){
  this.RapportSource.next(Rapport);
}
getRapportBsPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'RapportBs?page='+page+'&size='+size);
}
getRapportBsPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'RapportBs/'+page+'/'+size);
}
getRapportBsByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'RapportB/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getRapportB(id){
  return this.hhtpClient.get(this.basUrl+"RapportB/" + id);
}
}
