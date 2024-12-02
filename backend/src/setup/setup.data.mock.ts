import { PrismaService } from '@/integrations/prisma/prisma.service';
import { Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { SetupService } from './setup.service';

@Injectable()
export class SetupDataMock implements OnModuleInit{
    constructor(
      private prisma: PrismaService,
      private setup: SetupService
    ) {}
    onModuleInit() {
      console.log('The module has been initialized.');
      // Call another service or perform initialization logic here
      this.insertCategoryData();
    }


    // Category

    async insertCategoryData(): Promise<any> {
      try {

        const types = await this.setup.getAllBCategories();
        if(types.data.length == 0){
          const categories = await this.getCategories();
          this.setup.createManyCategories(categories);
        }
        
      } catch (err) {
        console.log(err);
        
      }
    }

      async getCategories(): Promise<any> {
        return [
          {
            "name": "Music","description":"Music"
          },
          {
            "name": "Nightlife","description":"Night Life"
          },
          {
            "name": "Comedy","description":"Comedy"
          },
          {
            "name": "Performing & Visual Art","description":"Performing & Visual Art"
          },
          {
            "name": "Holidays","description":"Holidays"
          },
          {
            "name": "Dating","description":"Dating"
          },
          {
            "name": "Business","description":"Business"
          },
          {
            "name": "Food & Drink","description":"Food & Drink"
          },
          
        ]
      }

}
