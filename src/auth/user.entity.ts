import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // 유저 한 명이 여러개의 게시글을 쓸 수 있음
  // @OneToMany(Type, inverseSide, Option)
  // eager: true이면 user 정보를 가져올 때 board도 가져옴
  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
