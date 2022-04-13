import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario();
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }
  confirmSenha(event: any) {
      this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){this.tipoUsuario = event.target.value

  }

  cadastrar(){
    this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha){
        this.alertas.showAlertDanger('As senhas não coincidem. Tente novamente!')
    }else{
        this.authService.cadastro(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp
          this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
          this.router.navigate(['/login'])
        })
    }
  }

}
