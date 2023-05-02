import { Injectable } from "@nestjs/common";
import { NewPageInput } from "./dto/new-page.input";
// import { RecipesArgs } from "./dto/recipes.args";
// import { Page } from "./models/page.model";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Page } from "./entities";
import { UpdatePageInput } from "./dto/update-page.input";

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly repository: Repository<Page>,
  ) {}

  async create(data: NewPageInput): Promise<Page> {
    const newData: any = data;
    newData.whiteboard = data.whiteboardId;
    const page: any = this.repository.create(newData);
    return await this.repository.save(page);
  }

  async findOneById(id: number): Promise<Page> {
    const page: any = await this.repository
      .createQueryBuilder("page")
      .where("page.id = :id", {
        id,
      })
      .leftJoinAndSelect("page.whiteboard", "whiteboard")
      .getOne();

    return page;
  }

  async findAll(): Promise<Page[]> {
    const pages: Page[] = await this.repository
      .createQueryBuilder("page")
      .leftJoinAndSelect("page.whiteboard", "whiteboard")
      .getMany();
    return pages;
  }

  async remove(id: number): Promise<boolean> {
    const page = await this.repository.delete({ id });
    console.log(page);
    if (page?.affected == 1) {
      return true;
    } else {
      return false;
    }
  }

  async update(data: UpdatePageInput): Promise<Page> {
    const page: any = await this.repository.findOne({
      where: { id: data.pageId },
    });

    if (!page) {
      return page;
    }

    page.name = data.name;
    page.whiteboard = data.whiteboardId;

    await this.repository.update(data.pageId, page);
    return page;
  }
}
