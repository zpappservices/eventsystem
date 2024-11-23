import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dtos/event.dto';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Get('/getAllevent')
    async getAllEvents() {
      return this.eventService.getAllEvents();
    }
    
  @Get('/getoneevent/:id')
  async getOneEvent(@Param('id') id: any): Promise<any> {
    const category = await this.eventService.getOneEvent(id);
    return category;
  }
  
    @Post('/createevent')
    async createEvent(@Body() body: EventDto) {
        return this.eventService.createEvent(body);
    }
    @Post('/updateevent/:id')
    async updateEvent(@Body() body: EventDto, @Param('id') id: string) {
        return this.eventService.updateEvent(body, id);
    }
}
