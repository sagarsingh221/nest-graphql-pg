import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { NewWhiteboardInput } from "./dto/new-whiteboard.input";
import { updateWhiteboardInput } from "./dto/update-whiteboard.input";
import { WhiteboardModel } from "./models/whiteboard.model";
import { WhiteBoardService } from "./whiteboard.service";

const pubSub = new PubSub();

@Resolver((of) => WhiteboardModel)
export class WhiteBoardResolver {
  constructor(private readonly whiteBoardService: WhiteBoardService) {}

  @Query((returns) => [WhiteboardModel])
  allWhiteBoards(): Promise<WhiteboardModel[]> {
    return this.whiteBoardService.findAll();
  }

  @Mutation((returns) => WhiteboardModel)
  async addNewWhiteBoard(
    @Args("newWhiteBoard") newWhiteboard: NewWhiteboardInput,
  ): Promise<WhiteboardModel> {
    const whiteboard = await this.whiteBoardService.create(newWhiteboard);
    return whiteboard;
  }

  @Query((returns) => WhiteboardModel)
  async whiteboard(@Args("id") id: number): Promise<WhiteboardModel> {
    const recipe = await this.whiteBoardService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Mutation((returns) => Boolean)
  async removeWhiteboard(@Args("id") id: number) {
    return this.whiteBoardService.remove(id);
  }

  @Mutation((returns) => WhiteboardModel)
  async updateWhiteBoard(
    @Args("update") updateWhiteboard: updateWhiteboardInput,
  ): Promise<WhiteboardModel> {
    const whiteboard = await this.whiteBoardService.update(updateWhiteboard);
    if (!whiteboard) {
      throw new NotFoundException(updateWhiteboard.whiteBoardId);
    }
    return whiteboard;
  }
}
