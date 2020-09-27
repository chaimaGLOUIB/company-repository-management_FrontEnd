import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SondageService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }
  getSondages(){
    return this.hhtpClient.get(this.basUrl+'Sondages');
  }
  getsondagesPages(page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'sondages?page='+page+'&size='+size);
  }
  getsondagesPage(page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'Sondages/'+page+'/'+size);
  }
  getsondagesByKeyword(mc:string,page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'Sondage/search/byNom?nom='+mc+'&page='+page+'&size='+size);
  }
  addSondage(Sondage){
    return this.hhtpClient.post(this.basUrl + 'Sondage' , Sondage);

  }
  updateSondage(id: number,Sondage: any){
    return this.hhtpClient.put(this.basUrl + "Sondage/" + id, Sondage);
  }
  deleteSondage(id :number){
    return this.hhtpClient.delete(this.basUrl + "Sondage/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getSondage(id){
  return this.hhtpClient.get(this.basUrl+"Sondage/" + id);
}
}
