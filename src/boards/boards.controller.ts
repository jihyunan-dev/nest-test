import { Controller } from "@nestjs/common";
import { BoardsService } from "./boards.service";

@Controller("boards")
export class BoardsController {
  // dependency injection
  constructor(private boardService: BoardsService) {}
}
