import { v1 as uuid } from "uuid"; // uuid 중 v1을 사용
import { Injectable } from "@nestjs/common";
import { Board, BoardStatus } from "./board.model";

@Injectable()
export class BoardsService {
  private boards: Board[] = [{ id: "1", title: "abcd", description: "", status: BoardStatus.PRIVATE }];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(title: string, description: string) {
    const board: Board = {
      id: uuid(), // db를 사용하지 않아 id를 얻기 위해 uuid 사용
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    // db저장
    return board;
  }
}
