import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Page } from "src/page/entities";

@Entity("whiteboard")
@ObjectType() // add this decorator for GraphQL support
export class WhiteBoard {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Field(() => ID) // add this decorator for GraphQL support
  id: number;

  @Column()
  @Field()
  userId: number;

  @Column()
  @Field()
  sessionId: number;

  @Column()
  name: string;

  @Column()
  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Page, (page) => page.whiteboard, {
    onDelete: "CASCADE",
  })
  pages: Page[];
}
