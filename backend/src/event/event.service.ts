import { HttpStatus, Injectable } from '@nestjs/common';
import { EventDto } from './dtos/event.dto';
import { PrismaService } from '@/integrations/prisma/prisma.service';

@Injectable()
export class EventService {
    constructor(private prisma: PrismaService) {}

  async getAllEvents() {

    try {
        const events = await this.prisma.event.findMany({
          //include: { tickets: true },
        });
        return {
          statusCode: HttpStatus.OK,
          data: events,
          message: 'Success',
        };
      } catch (err) {
        console.log(err);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          data: null,
          message: 'Unable to fetch event!',
        };
      }
  }
  
  async getOneEvent(id: string) {

    try {
        const event = await this.prisma.event.findUnique({
          where: {id}
        });
        return {
          statusCode: HttpStatus.OK,
          data: event,
          message: 'Success',
        };
      } catch (err) {
        console.log(err);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          data: null,
          message: 'Unable to fetch event!',
        };
      }
  }

  async createEvent(data: EventDto) {

    try {
        const created = await this.prisma.event.create({
          data: {
            userId: data.userId,
            title: data.title,
            description: data.description,
            location: data.location,
            StartDate: data.StartDate,
            EndDate: data.EndDate,
            StartTime: data.StartTime,
            EndTime: data.EndTime,
            AllDay: data.AllDay,           
            image_tile: data.image_tile,
            image_banner: data.image_banner,
            isPublished: false,
            active: true,

            createdOn: new Date(),
            createdBy: data.createdBy,
          }
        });
        return {
          statusCode: HttpStatus.CREATED,
          data: created,
          message: 'Event created successfully.',
        };
      } catch (err) {
        console.log(err);
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          data: null,
          message: 'Unable to create event.',
        };
      }
  }

  
  async updateEvent(data: EventDto, id: string) {

    try {
        const created = await this.prisma.event.update({
            where: {id},
          data: {
            title: data.title,
            description: data.description,
            location: data.location,
            StartDate: data.StartDate,
            EndDate: data.EndDate,
            StartTime: data.StartTime,
            EndTime: data.EndTime,
            AllDay: data.AllDay,
            image_tile: data.image_tile,
            image_banner: data.image_banner,
            createdOn: new Date(),
            createdBy: data.createdBy,
          },
        });
        return {
          statusCode: HttpStatus.CREATED,
          data: created,
          message: 'Event created successfully.',
        };
      } catch (err) {
        console.log(err);
        return {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          data: null,
          message: 'Unable to create event.',
        };
      }
  }
}
