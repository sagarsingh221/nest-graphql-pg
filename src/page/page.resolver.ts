import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { NewPageInput } from "./dto/new-page.input";
import { UpdatePageInput } from "./dto/update-page.input";
import { PageModel } from "./models/page.model";
import { PageService } from "./page.service";

@Resolver((of) => PageModel)
export class PageResolver {
  constructor(private readonly pageService: PageService) {}

  @Query((returns) => [PageModel])
  async allPages(): Promise<PageModel[]> {
    const pages: any = await this.pageService.findAll();
    return pages;
  }

  @Mutation((returns) => PageModel)
  async addNewPage(@Args("newPage") newPage: NewPageInput): Promise<PageModel> {
    const whiteboard: any = await this.pageService.create(newPage);
    return whiteboard;
  }

  @Query((returns) => PageModel)
  async page(@Args("id") id: number): Promise<PageModel> {
    const recipe: any = await this.pageService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Mutation((returns) => Boolean)
  async removePage(@Args("id") id: number) {
    console.log(id);
    return this.pageService.remove(id);
  }

  @Mutation((returns) => PageModel)
  async updatePage(
    @Args("update") updatePageInput: UpdatePageInput,
  ): Promise<PageModel> {
    const page: any = await this.pageService.update(updatePageInput);
    if (!page) {
      throw new NotFoundException(updatePageInput.pageId);
    }
    return page;
  }
}
