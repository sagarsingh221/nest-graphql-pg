import { Module } from "@nestjs/common";
import { DateScalar } from "../common/scalars/date.scalar";
import { PageResolver } from "./page.resolver";
import { PageService } from "./page.service";
import { Page } from "./entities/page.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  providers: [PageResolver, PageService, DateScalar],
})
export class PageModule {}
