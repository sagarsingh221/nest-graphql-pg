import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { Page } from "src/page/entities";

@Entity("object")
@ObjectType() // add this decorator for GraphQL support
export class ObjectEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Field(() => ID) // add this decorator for GraphQL support
  id: number;

  @Column()
  @IsOptional()
  data: string;

  @Column()
  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => Page, (whiteBoard) => whiteBoard.objects, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  page: Page;
}
