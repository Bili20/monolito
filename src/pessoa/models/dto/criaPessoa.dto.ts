import { CriaEnderecoDTO } from './criaEndereco.dto';

export class CriaPessoaDto {
  nome: string;
  documento: string;
  data_nacimento: Date;
  email: string;
  telefone: string;
  sexo: string;
  endereco: CriaEnderecoDTO;
}
