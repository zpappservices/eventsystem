import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { EventContactDto, EventDto, EventTicketDto, VendorEventDto } from './dtos/event.dto';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Get('/getAllevent')
    async getAllEvents() {
      return this.eventService.getAllEvents();
    }
    
  @Get('/getoneevent/:id')
  async getOneEvent(@Param('id') id: any): Promise<any> {
    return this.eventService.getOneEvent(id);
  }
      
  @Get('/geteventbycategory/:id')
  async getEventByCategory(@Param('id') id: any): Promise<any> {
    return this.eventService.getEventByCategory(id);
  }
  
    @Post('/createevent')
    async createEvent(@Body() body: EventDto) {
        return this.eventService.createEvent(body);
    }
      
    @Post('/v2/createevent')
    async createEventV2(@Body() body: VendorEventDto) {
        return this.eventService.createEventV2(body);
    }
    @Post('/updateevent/:id')
    async updateEvent(@Body() body: EventDto, @Param('id') id: string) {
        return this.eventService.updateEvent(body, id);
    }

      
    @Post('/createcontact')
    async createContact(@Body() body: EventContactDto) {
        return this.eventService.createContact(body);
    }
    @Post('/updatecontact/:id')
    async updateContact(@Body() body: EventContactDto, @Param('id') id: string) {
        return this.eventService.updateContact(body, id);
    }
      
  @Get('/getonecontact/:id')
  async getOneContact(@Param('id') id: any): Promise<any> {
    const contact = await this.eventService.getOneContact(id);
    return contact;
  }
      
  @Get('/getcontactbyevent/:id')
  async getContactByEvent(@Param('id') id: any): Promise<any> {
    const response = await this.eventService.getContactByEvent(id);
    return response;
  }

  // Ticket
       
    @Post('/createticket')
    async createTicket(@Body() body: EventTicketDto) {
        return this.eventService.createTicket(body);
    }
    @Post('/updateticket/:id')
    async updateTicket(@Body() body: EventTicketDto, @Param('id') id: string) {
        return this.eventService.updateTicket(body, id);
    }
        
    @Get('/getoneticket/:id')
    async getOneTicket(@Param('id') id: any): Promise<any> {
    const response = await this.eventService.getOneTicket(id);
    return response;
    }
        
    @Get('/getticketbyevent/:id')
    async getTicketByEvent(@Param('id') id: any): Promise<any> {
    const response = await this.eventService.getTicketByEvent(id);
    return response;
    }
}
