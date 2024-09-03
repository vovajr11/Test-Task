import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post('create')
  async register(@Body() body: CreateProjectDto) {
    return this.projectsService.create(body);
  }

  @Get()
  async getProjectsByUserId(@Query('userId') userId: string) {
    return this.projectsService.getProjectsByUserId(userId);
  }

  @Delete(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.deleteById(id);
  }
}
