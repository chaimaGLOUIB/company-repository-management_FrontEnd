import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieArretService {
  private basUrl = 'http://localhost:8080/';

  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();
  }

  getCategorieArrets(){
    return this.hhtpClient.get(this.basUrl+'CategorieArrets');
  }
  addCategorieArret(CategorieArret){
    return this.hhtpClient.post(this.basUrl + 'CategorieArret' , CategorieArret);

  }
  updateCategorieArret(id: number,CategorieArret: any){
    return this.hhtpClient.put(this.basUrl + "CategorieArret/" + id, CategorieArret);
  }
  deleteCategorieArret(id :number){
    return this.hhtpClient.delete(this.basUrl + "CategorieArret/" + id);

  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
getcategorieArretsPages(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'categorieArrets?page='+page+'&size='+size);
}
getcategorieArretsPage(page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'CategorieArrets/'+page+'/'+size);
}
getcategorieArretsByKeyword(mc:string,page:number,size:number){
  return this.hhtpClient.get(this.basUrl+'CategorieArrets/search/byNom?nom='+mc+'&page='+page+'&size='+size);
}
getCategorieArret(id){
  return this.hhtpClient.get(this.basUrl+"CategorieArret/" + id);
}
}
