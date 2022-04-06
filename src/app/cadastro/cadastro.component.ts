import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
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
    private router: Router
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
        alert('As senhas não coincidem. Tente novamente!')
    }else{
        this.authService.cadastro(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp
          alert('Usuário cadastrado com sucesso!')
          this.router.navigate(['/login'])
        })
    }
  }

}
