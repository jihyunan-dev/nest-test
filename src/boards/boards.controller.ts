import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Board } from "./board.entity";
import { BoardStatus } from "./board.model";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation.pipe";

@Controller("boards")
export class BoardsController {
  // dependency injection
  constructor(private boardService: BoardsService) {}

  @Get("/")
  getBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  @Post("/")
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get("/:id")
  getBoardById(@Param("id") id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Delete("/:id")
  deleteBoardById(@Param("id") id: number): Promise<void> {
    return this.boardService.deleteBoardById(id);
  }

  @Put("/:id/status")
  updateBoardStatus(
    @Param("id") id: number,
    @Body("status", BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }
}
