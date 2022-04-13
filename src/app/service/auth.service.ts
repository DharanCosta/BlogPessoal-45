import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  token ={
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token ={
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  login(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://blogpessoaldharan.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastro(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://blogpessoaldharan.herokuapp.com/usuarios/cadastrar', usuario)
  }

  atualizar(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>('https://blogpessoaldharan.herokuapp.com/usuarios/atualizar', usuario, this.token )
  }

  getByIdUser(id:number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://blogpessoaldharan.herokuapp.com/usuarios/${id}`, this.token)
  }

  logado(){
    let ok: boolean = false
    if(environment.token != ''){
      ok=true
    }
    return ok
  }

  adm(){
    let ok: boolean = false
    if(environment.tipo == 'adm'){
      ok=true
    }
    return ok
  }

}
