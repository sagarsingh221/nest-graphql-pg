import { Field, InputType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";

@InputType()
export class UpdatePageInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  whiteboardId: number;

  @Field()
  pageId: number;
}
