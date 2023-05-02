import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { NewObjectInput } from "./dto/new-object.input";
import { UpdateObjectInput } from "./dto/update-object.input";
import { ObjectModel } from "./models/object.model";
import { ObjectService } from "./object.service";

@Resolver((of) => ObjectModel)
export class ObjectResolver {
  constructor(private readonly objectService: ObjectService) {}

  @Query((returns) => [ObjectModel])
  allObjects(): Promise<any[]> {
    return this.objectService.findAll();
  }

  @Mutation((returns) => ObjectModel)
  async addNewObject(
    @Args("newObject") newObject: NewObjectInput,
  ): Promise<ObjectModel> {
    const whiteboard: any = await this.objectService.create(newObject);
    return whiteboard;
  }

  @Query((returns) => ObjectModel)
  async object(@Args("id") id: number): Promise<ObjectModel> {
    const recipe: any = await this.objectService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Mutation((returns) => Boolean)
  async removeObject(@Args("id") id: number) {
    return this.objectService.remove(id);
  }

  @Mutation((returns) => ObjectModel)
  async updateObject(
    @Args("update") updateObjectInput: UpdateObjectInput,
  ): Promise<ObjectModel> {
    const whiteboard: any = await this.objectService.update(updateObjectInput);
    if (!whiteboard) {
      throw new NotFoundException(updateObjectInput.objectId);
    }
    return whiteboard;
  }
}
