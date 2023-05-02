import { Field, InputType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";

@InputType()
export class NewObjectInput {
  @Field()
  @MaxLength(30000)
  data: string;

  @Field()
  pageId: number;
}
