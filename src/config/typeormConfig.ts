import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'pguser',
  password: 'pgpassword',
  database: 'pg_monolito',
  entities: [__dirname + './../**/*.entity.{js,ts}'],
  synchronize: true,
};
