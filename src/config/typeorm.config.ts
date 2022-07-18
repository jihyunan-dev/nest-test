import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
  //Database Type
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "board-app",
  // Entities to be loaded for this connection
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  // synchronize : production에서는 false로 해야한다
  synchronize: true,
};
