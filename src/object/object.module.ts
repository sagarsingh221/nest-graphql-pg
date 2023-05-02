import { Module } from "@nestjs/common";
import { DateScalar } from "../common/scalars/date.scalar";
import { ObjectResolver } from "./object.resolver";
import { ObjectService } from "./object.service";
import { ObjectEntity } from "./entities/object.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ObjectEntity])],
  providers: [ObjectResolver, ObjectService, DateScalar],
})
export class ObjectModule {}
