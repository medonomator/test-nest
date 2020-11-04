import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './gurds/roles.guard'
import { Roles } from './decorators/roles.decorator';

@Roles('admin')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(RolesGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
