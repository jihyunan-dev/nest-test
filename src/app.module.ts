// nestjs
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// modules
import { AuthModule } from "./auth/auth.module";
import { BoardsModule } from "./boards/boards.module";
// config
import { typeORMConfig } from "./config/typeorm.config";

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
