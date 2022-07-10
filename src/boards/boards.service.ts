import { Injectable } from "@nestjs/common";
import { Board, BoardStatus } from "./board.model";

@Injectable()
export class BoardsService {
  private boards: Board[] = [{ id: "1", title: "abcd", description: "", status: BoardStatus.PRIVATE }];

  getAllBoards(): Board[] {
    return this.boards;
  }
}
