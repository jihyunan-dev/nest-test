import { Controller, Get } from "@nestjs/common";
import { Board } from "./board.model";
import { BoardsService } from "./boards.service";

@Controller("boards")
export class BoardsController {
  // dependency injection
  constructor(private boardService: BoardsService) {}

  @Get("/")
  getBoards(): Board[] {
    return this.boardService.getAllBoards();
  }
}
