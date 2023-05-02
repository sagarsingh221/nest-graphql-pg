import { Injectable } from "@nestjs/common";
import { NewWhiteboardInput } from "./dto/new-whiteboard.input";
// import { RecipesArgs } from "./dto/recipes.args";
import { WhiteboardModel } from "./models/whiteboard.model";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { WhiteBoard } from "./entities";
import { updateWhiteboardInput } from "./dto/update-whiteboard.input";

@Injectable()
export class WhiteBoardService {
  constructor(
    @InjectRepository(WhiteBoard)
    private readonly repository: Repository<WhiteBoard>,
  ) {}

  async create(data: NewWhiteboardInput): Promise<WhiteBoard> {
    const whiteboard = this.repository.create(data);
    return await this.repository.save(whiteboard);
  }

  async findOneById(id: number): Promise<WhiteboardModel> {
    const whiteboard: WhiteBoard = await this.repository.findOne({
      where: { id: id },
    });
    return whiteboard;
  }

  async findAll(): Promise<WhiteboardModel[]> {
    const whiteboards: WhiteboardModel[] = await this.repository.find({});
    return whiteboards;
  }

  async remove(id: number): Promise<boolean> {
    const whiteBoard = await this.repository.delete({ id });
    if (whiteBoard?.affected == 1) {
      return true;
    } else {
      return false;
    }
  }

  async update(data: updateWhiteboardInput): Promise<WhiteboardModel> {
    const whiteboard: WhiteBoard = await this.repository.findOne({
      where: { id: data.whiteBoardId },
    });

    if (!whiteboard) {
      return whiteboard;
    }

    whiteboard.userId = data.userId;
    whiteboard.sessionId = data.sessionId;
    whiteboard.name = data.name;

    await this.repository.update(data.whiteBoardId, whiteboard);
    return whiteboard;
  }
}
