import { Field, InputType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";

@InputType()
export class NewPageInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  whiteboardId: number;
}
