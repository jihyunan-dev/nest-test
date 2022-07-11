import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Board, BoardStatus } from "./board.model";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";

@Controller("boards")
export class BoardsController {
  // dependency injection
  constructor(private boardService: BoardsService) {}

  @Get("/")
  getBoards(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Post("/")
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get("/:id")
  getBoardById(@Param("id") id: string): Board {
    return this.boardService.getBoardById(id);
  }

  @Delete("/:id")
  deleteBoardById(@Param("id") id: string): void {
    return this.boardService.deleteBoardById(id);
  }

  @Put("/:id/status")
  updateBoardStatus(@Param("id") boardId: string, @Body("status") status: BoardStatus): void {
    return this.boardService.updateBoardStatus(boardId, status);
  }
}
