import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChantierService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getChantiers(){
    return this.hhtpClient.get(this.basUrl+'Chantiers');
  }
  addChantier(Chantier){
    return this.hhtpClient.post(this.basUrl + 'Chantier' , Chantier);

  }
  updateChantier(id: number,Chantier: any){
    return this.hhtpClient.put(this.basUrl + "Chantier/" + id, Chantier);
  }
  deleteChantier(id :number){
    return this.hhtpClient.delete(this.basUrl + "Chantier/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getchantiersPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'chantiers?page='+page+'&size='+size);
}
getchantiersPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Chantiers/'+page+'/'+size);
}
getchantiersByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'chantiers/search/byNom?mc='+mc+'&page='+page+'&size='+size);
}
getChantier(id){
  return this.hhtpClient.get(this.basUrl+"Chantier/" + id);
}
}
