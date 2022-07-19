import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";
import { Board } from "./board.entity";
import { BoardStatus } from "./board.model";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation.pipe";

@Controller("boards")
@UseGuards(AuthGuard()) // controller 레벨에서 guard
export class BoardsController {
  // dependency injection
  constructor(private boardService: BoardsService) {}

  @Get("/")
  getBoards(@GetUser() user: User): Promise<Board[]> {
    return this.boardService.getAllBoards(user);
  }

  @Post("/")
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  @Get("/:id")
  getBoardById(@Param("id") id: number, @GetUser() user: User): Promise<Board> {
    return this.boardService.getBoardById(id, user);
  }

  @Delete("/:id")
  deleteBoardById(@Param("id") id: number, @GetUser() user: User): Promise<void> {
    return this.boardService.deleteBoardById(id, user);
  }

  @Put("/:id/status")
  updateBoardStatus(
    @Param("id") id: number,
    @Body("status", BoardStatusValidationPipe) status: BoardStatus,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status, user);
  }
}
