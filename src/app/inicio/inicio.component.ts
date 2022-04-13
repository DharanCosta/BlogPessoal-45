import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  user: Usuario = new Usuario()
  idUser = environment.id

  key = 'data'
  reverse = true

  tituloPost: string
  nomeTema: string

  constructor(
    private router: Router,
    public authService: AuthService,
    private temaService: TemaService,
    private postagemService: PostagemService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      this.alertas.showAlertInfo('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/login'])
    }

    this.authService.refreshToken()
    this.buscarTemas()
    this.buscarPostagens()

  }

  buscarTemas(){
    this.temaService.getTemas().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  buscarPostagens(){
    this.postagemService.getPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.buscarPostagens()
    })
  }

  findByTituloPostagem(){
    if(this.tituloPost == ''){
      this.buscarPostagens()
    }else{
    this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }
}

findByNomeTema(){
  if(this.nomeTema == ''){
    this.buscarTemas()
  }else{
  this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[])=>{
    this.listaTemas = resp
  })
}

}


}
