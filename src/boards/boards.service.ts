import { v1 as uuid } from "uuid"; // uuid 중 v1을 사용
import { Injectable, NotFoundException } from "@nestjs/common";
import { Board, BoardStatus } from "./board.model";
import { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BoardsService {
  private boards: Board[] = [{ id: "1", title: "abcd", description: "", status: BoardStatus.PRIVATE }];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;
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

  getBoardById(boardId: string): Board {
    const target = this.boards.find((board) => board.id === boardId);
    if (!target) {
      throw new NotFoundException("해당 보드를 찾을 수 없습니다.");
    }
    return target;
  }

  deleteBoardById(boardId: string): void {
    const target = this.boards.find((board) => board.id === boardId);
    if (!target) {
      throw new NotFoundException("해당 보드를 찾을 수 없습니다.");
    }
    this.boards.filter((board) => board.id !== target.id);
  }

  updateBoardStatus(boardId: string, status: BoardStatus): Board {
    const index = this.boards.findIndex((board) => board.id === boardId);
    this.boards[index].status = status;
    return this.boards[index];
  }
}
