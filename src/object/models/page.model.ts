import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType({ description: "page whiteBoard Model" })
export class PageModels {
  @Field()
  name: string;

  @Field()
  id: number;
}
