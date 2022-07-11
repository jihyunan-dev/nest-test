import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Board, BoardStatus } from "./board.model";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation.pipe";

@Controller("boards")
export class BoardsController {
  // dependency injection
  constructor(private boardService: BoardsService) {}

  @Get("/")
  getBoards(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Post("/")
  @UsePipes(ValidationPipe)
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
  updateBoardStatus(
    @Param("id") boardId: string,
    @Body("status", BoardStatusValidationPipe) status: BoardStatus,
  ): Board {
    return this.boardService.updateBoardStatus(boardId, status);
  }

  @Get("/test/:id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return "good!";
  }
}
