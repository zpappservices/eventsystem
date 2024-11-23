import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SetupService } from './setup.service';
import { CategoryDto } from './dtos/setup.dto';

@Controller('setup')
export class SetupController {
    constructor(private readonly setupService: SetupService) {}

  @Post('/createcategory')
  async createCategory(@Body() dto: CategoryDto): Promise<void> {
    const created = await this.setupService.create(dto);
    return created;
  }

  @Post('/updatecategory/:id')
  async updateCategory(
    @Body() dto: CategoryDto,
    @Param() id: string,
  ): Promise<void> {
    const updated = await this.setupService.updateCategory(dto, id);
    return updated;
  }

  @Get('/getallcategory')
  async getAllCategory(): Promise<any> {
    const categories = await this.setupService.getAllBCategories();
    return categories;
  }

  @Get('/getonecategory/:id')
  async getOneCategory(@Param('id') id: any): Promise<any> {
    const category = await this.setupService.getOneBCategory(id);
    return category;
  }

//   @Get('/togglepublished/:id')
//   async togglePublished(@Param('id') id: any): Promise<any> {
//     const news = await this.newsService.togglePublished(id);
//     return news;
//   }

}
