import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getCollaborateurs(){
    return this.hhtpClient.get(this.basUrl+'Collaborateurs');
  }
  addCollaborateur(Collaborateur){
    return this.hhtpClient.post(this.basUrl + 'Collaborateur' , Collaborateur);

  }
  updateCollaborateur(id: number,Collaborateur: any){
    return this.hhtpClient.put(this.basUrl + "Collaborateur/" + id, Collaborateur);
  }
  deleteCollaborateur(id :number){
    return this.hhtpClient.delete(this.basUrl + "Collaborateur/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getcollaborateursPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'collaborateurs?page='+page+'&size='+size);
}
getcollaborateursPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Collaborateurs/'+page+'/'+size);
}
getcollaborateursByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Collaborateur/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getCollaborateur(id){
  return this.hhtpClient.get(this.basUrl+"Collaborateur/" + id);
}

}
