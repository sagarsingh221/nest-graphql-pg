import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "whiteboardModel" })
export class WhiteboardModel {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  sessionId: number;

  @Field()
  userId: number;

  @Field()
  createdAt: Date;
}
