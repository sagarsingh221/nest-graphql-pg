import { Injectable } from "@nestjs/common";
import { NewObjectInput } from "./dto/new-object.input";
// import { RecipesArgs } from "./dto/recipes.args";
// import { Page } from "./models/page.model";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectEntity } from "./entities";
import { UpdateObjectInput } from "./dto/update-object.input";

@Injectable()
export class ObjectService {
  constructor(
    @InjectRepository(ObjectEntity)
    private readonly repository: Repository<ObjectEntity>,
  ) {}

  async create(data: NewObjectInput): Promise<ObjectEntity> {
    const newData: any = data;
    newData.page = newData.pageId;
    const object: any = this.repository.create(newData);
    return await this.repository.save(object);
  }

  async findOneById(id: number): Promise<ObjectEntity> {
    const object: any = await this.repository
      .createQueryBuilder("object")
      .where("object.id = :id", {
        id,
      })
      .leftJoinAndSelect("object.page", "page")
      .getOne();

    return object;
  }

  async findAll(): Promise<ObjectEntity[]> {
    const objects: ObjectEntity[] = await this.repository
      .createQueryBuilder("object")
      .leftJoinAndSelect("object.page", "page")
      .getMany();
    return objects;
  }

  async remove(id: number): Promise<boolean> {
    const object = await this.repository.delete({ id });
    if (object?.affected == 1) {
      return true;
    } else {
      return false;
    }
  }

  async update(data: UpdateObjectInput): Promise<ObjectEntity> {
    const object: any = await this.repository.findOne({
      where: { id: data.objectId },
    });

    if (!object) {
      return object;
    }

    object.data = data.data;
    object.page = data.pageId;

    await this.repository.update(data.objectId, object);
    return object;
  }
}
