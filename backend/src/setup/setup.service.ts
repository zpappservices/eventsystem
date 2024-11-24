import { PrismaService } from '@/integrations/prisma/prisma.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CategoryDto } from './dtos/setup.dto';

@Injectable()
export class SetupService {
    constructor(private prisma: PrismaService) {}
    
    // Event Category
  async getAllBCategories(): Promise<any> {
    try {
      const types = await this.prisma.category.findMany({
        where: { active: true },
      });
      return {
        statusCode: HttpStatus.OK,
        data: types,
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
        message: 'Unable to fetch categories!',
      };
    }
  }

  async getOneBCategory(id: string): Promise<any> {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
      });
      return {
        statusCode: HttpStatus.OK,
        data: category,
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
        message: 'Unable to fetch category!',
      };
    }
  }

  async createManyCategories(types: CategoryDto[]): Promise<any> {
    try {
      const createMany = await this.prisma.category.createMany({
        data: types,
        skipDuplicates: true, // Skip 'Bobo'
      });

      return {
        statusCode: HttpStatus.CREATED,
        data: createMany,
        message: 'Types created successfully.',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        data: null,
        message: 'Unable to create types.',
      };
    }
  }

  
  async create(category: CategoryDto): Promise<any> {
    try {
      const created = await this.prisma.category.create({
        data: {
          name: category.name,
          description: category.description,
          createdOn: new Date(),
          createdBy: category.createdBy,
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        data: created,
        message: 'Category created successfully.',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        data: null,
        message: 'Unable to create category.',
      };
    }
  }

    
  async updateCategory(category: CategoryDto, id: string): Promise<any> {
    try {
      const created = await this.prisma.category.update({
        where: {id},
        data: {
          name: category.name,
          description: category.description,
          updatedOn: new Date(),
          createdBy: category.createdBy,
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        data: created,
        message: 'Category updated successfully.',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        data: null,
        message: 'Unable to update category.',
      };
    }
  }
}
