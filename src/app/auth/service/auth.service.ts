import { Injectable } from '@angular/core';
import { ApiService } from '../../../app/services/service';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {


  // localpath:any = `http://localhost:3000`;
  localpath:any=`https://dickkny.vercel.app`

 
}
