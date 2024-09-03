import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './interfaces/project.interface';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project') private readonly projectModel: Model<Project>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
  ): Promise<{ projectId: string }> {
    const userId = new mongoose.Types.ObjectId(createProjectDto.userId);

    const existingProject = await this.projectModel.findOne({
      name: createProjectDto.name,
      userId,
    });

    if (existingProject) {
      throw new ConflictException('Project with this name already exists');
    }

    const createdProject = await this.projectModel.create({
      ...createProjectDto,
      userId,
    });

    return { projectId: createdProject._id.toString() };
  }

  async getProjectsByUserId(userId: string) {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const data = await this.projectModel.find({ userId: userObjectId });
    return data;
  }

  async deleteById(_id: string) {
    const res = await this.projectModel.findByIdAndDelete({ _id });
    return res;
  }
}
