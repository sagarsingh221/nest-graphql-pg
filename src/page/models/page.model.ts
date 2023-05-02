import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { WhiteBoardModel } from "./whiteboard.model";
@ObjectType({ description: "pageModel" })
export class PageModel {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field(() => WhiteBoardModel)
  whiteboard: WhiteBoardModel;
}
