import { CriaEnderecoDTO } from './criaEndereco.dto';

export class CriaPessoaDto {
  nome: string;
  documento: string;
  data_nacimento: Date;
  email: string;
  telefone: number;
  sexo: string;
  endereco: CriaEnderecoDTO;
}
