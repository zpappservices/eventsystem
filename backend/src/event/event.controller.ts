import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dtos/event.dto';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}
    
    @Get()
    async getAllEvents() {
      return this.eventService.getAllEvents();
    }
  
    @Post()
    async createEvent(@Body() body: EventDto) {
      return this.eventService.createEvent(body);
    }
}
