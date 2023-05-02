import { Module } from "@nestjs/common";
import { DateScalar } from "../common/scalars/date.scalar";
import { WhiteBoardResolver } from "./whiteboard.resolver";
import { WhiteBoardService } from "./whiteboard.service";
import { WhiteBoard } from "./entities/whiteboard.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([WhiteBoard])],
  providers: [WhiteBoardResolver, WhiteBoardService, DateScalar],
})
export class WhiteBoardModule {}
