import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { WhiteBoard } from "src/whiteboard/entities";
import { ObjectEntity } from "src/object/entities";
@Entity("page")
@ObjectType() // add this decorator for GraphQL support
export class Page {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Field(() => ID) // add this decorator for GraphQL support
  id: number;

  @Column()
  @IsOptional()
  name: string;

  @Column()
  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => WhiteBoard, (whiteBoard) => whiteBoard.pages, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  whiteboard: WhiteBoard;

  @OneToMany(() => ObjectEntity, (object) => object.page, {
    onDelete: "CASCADE",
  })
  objects: ObjectEntity[];
}
