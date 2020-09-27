import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiametreService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getDiametres(){
    return this.hhtpClient.get(this.basUrl+'Diametres');
  }
  addDiametre(Diametre){
    return this.hhtpClient.post(this.basUrl + 'Diametre' , Diametre);

  }
  updateDiametre(id: number,Diametre: any){
    return this.hhtpClient.put(this.basUrl + 'Diametre/' + id, Diametre);
  }
  
  deleteDiametre(id :number){
    return this.hhtpClient.delete(this.basUrl + 'Diametre/' + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getdiametresPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'diametres?page='+page+'&size='+size);
}
getdiametresPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Diametres/'+page+'/'+size);
}
getdiametresByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'Diametre/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getDiametre(id){
  return this.hhtpClient.get(this.basUrl+"Diametre/" + id);
}
}
