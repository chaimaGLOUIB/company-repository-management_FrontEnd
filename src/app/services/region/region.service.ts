import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private basUrl = 'http://localhost:8080/';
  IdSource = new  BehaviorSubject<number>(0);
  IdData:any;

  constructor(private hhtpClient: HttpClient) {
    this.IdData= this.IdSource.asObservable();

  }

  getRegions(){
    return this.hhtpClient.get(this.basUrl+'Regionss');
  }
  getRegionss(page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'Regionsss/'+page+'/'+size);
  }
  getRegionsByKeyword(mc:string,page:number,size:number){
    return this.hhtpClient.get(this.basUrl+'Region/search/byNom?nom='+mc+'&page='+page+'&size='+size);
  }
  addRegion(region){
    return this.hhtpClient.post(this.basUrl + 'Region' , region);

  }
  updateRegion(id: number,region: any){
    return this.hhtpClient.put(this.basUrl + "Region/" + id, region);
  }
  deleteRegion(id :number){
    return this.hhtpClient.delete(this.basUrl + "Region/" + id);

  }
  getRegion(id){
    return this.hhtpClient.get(this.basUrl+"Region/" + id);
  }
  changeId(postId: number){
    this.IdSource.next(postId);
}
 
}
