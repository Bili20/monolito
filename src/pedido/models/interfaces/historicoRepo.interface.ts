import { Historico } from '../entities/historico.entity';

export interface IHistoricoRepo {
  create(param: Historico): Promise<void>;
}
