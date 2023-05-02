import { Field, InputType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";

@InputType()
export class NewWhiteboardInput {
  @Field()
  userId: number;

  @Field()
  sessionId: number;

  @Field()
  @MaxLength(30)
  name: string;
}
