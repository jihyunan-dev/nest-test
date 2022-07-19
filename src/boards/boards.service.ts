import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "./board.entity";
import { Repository } from "typeorm";
import { BoardStatus } from "./board.model";
import { User } from "src/auth/user.entity";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  async getBoardById(id: number, user): Promise<Board> {
    const found = await this.boardsRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async getAllBoards(user): Promise<Board[]> {
    // repository api 이용 ver
    // const boardlist = await this.boardsRepository.find({ where: { user } });

    // queryBuilder 사용 ver
    const query = this.boardsRepository.createQueryBuilder("board");
    query.where("board.userId = :userId", { userId: user.id });
    const boards = await query.getMany();
    return boards;
  }

  async createBoard(createBoardDto: CreateBoardDto, user): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.boardsRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.boardsRepository.save(board);
    return board;
  }

  async deleteBoardById(id: number, user): Promise<void> {
    const result = await this.boardsRepository.delete({ id, user });
    // const query = this.boardsRepository.createQueryBuilder("board");
    // const result = await query
    //   .delete()
    //   .from(Board)
    //   .where("user = :user", { user })
    //   .andWhere("id = :id", { id })
    //   .execute();
    // console.log(result);
    console.log(result);

    if (result.affected === 0) {
      throw new NotFoundException("해당 게시물을 찾을 수 없습니다.");
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus, user): Promise<Board> {
    const board = await this.getBoardById(id, user);
    board.status = status;
    await this.boardsRepository.save(board);
    return board;
  }
}
