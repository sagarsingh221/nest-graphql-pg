import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { PageModels } from "./page.model";
@ObjectType({ description: "pageModel" })

export class ObjectModel {
  @Field((type) => ID)
  id: number;

  @Field()
  data: string;

  @Field()
  createdAt: Date;

  @Field(() => PageModels)
  page: PageModels;
}
