import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../gurds/roles.guard';
import { CatsService } from './cats.service';

@Roles('admin')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UseGuards(RolesGuard)
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
