import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      alert('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/login'])
    }

    if(environment.tipo != 'adm'){
      this.alertas.showAlertDanger('Você precisa ser administrador para acessar essa rota')
      this.router.navigate(['/inicio'])
    }

    this.authService.refreshToken()
    this.buscarTemas()
  }

  buscarTemas(){
    this.temaService.getTemas().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  cadastrarTema(){
    this.temaService.postTema(this.tema).subscribe((resp:Tema)=>{
      this.tema=resp
      this.alertas.showAlertSuccess('Tema cadastrado com sucesso!')
      this.tema = new Tema()
      this.buscarTemas()
    })
  }



}
