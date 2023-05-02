import { Field, InputType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";

@InputType()
export class UpdateObjectInput {
  @Field()
  @MaxLength(30000)
  data: string;

  @Field()
  pageId: number;

  @Field()
  objectId: number;
}
