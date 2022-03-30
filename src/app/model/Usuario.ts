import { Postagem } from "./Postagem";

export class Usuario{
    public id: number;
    public nome: string;
    public foto: string;
    public usuario: string;
    public senha: string;
    public postagem: Postagem[];
    public tipo: string;
}
