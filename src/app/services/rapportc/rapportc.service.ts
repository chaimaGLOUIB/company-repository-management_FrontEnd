import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportCService {
  private basUrl = 'http://localhost:8080/';
  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }

  getRapportCs(){
    return this.hhtpClient.get(this.basUrl+'RapportCs');
  }
  addRapportC(RapportC){
    return this.hhtpClient.post(this.basUrl + 'RapportC' , RapportC);

  }
  updateRapportC(id: number,RapportC: any){
    return this.hhtpClient.put(this.basUrl + 'RapportC/' + id, RapportC);
  }
  deleteRapportC(id :number){
    return this.hhtpClient.delete(this.basUrl + "RapportC/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getRapportCsPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'RapportCs?page='+page+'&size='+size);
}
getRapportCsPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'RapportCs/'+page+'/'+size);
}
getRapportCsByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'RapportC/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getRapportC(id){
  return this.hhtpClient.get(this.basUrl+"RapportC/" + id);
}
}
