import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType({ description: "page whiteBoard Model" })
export class WhiteBoardModel {
  @Field()
  name: string;

  @Field()
  id: string;
}
