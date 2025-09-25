import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CheckinDto,
  Currency,
  EventContactDto,
  EventDto,
  EventImageDto,
  EventTicketDto,
  FilterEventDto,
  VendorEventDto,
} from './dtos/event.dto';
import { PrismaService } from '@/integrations/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { AwsS3Service } from '@/integrations/amazons3/aws-s3.service';
import { S3BucketEnum } from '@/payment/dtos/payment.dto';
import { title } from 'process';

@Injectable()
export class EventService {
  constructor(
    private prisma: PrismaService,
    private awsS3Service: AwsS3Service,
  ) {}

  async getAllEvents() {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          StartDate: {
            gte: new Date(), // Fetch events where eventDate is in the future
          },
        },
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

  async getEventByFilter(filters: FilterEventDto) {
    try {
      const { search, date, level, category, eventType, page, limit } = filters;

      const where: any = {};

      // Search by name or email
      if (search) {
        where.OR = [{ title: { contains: search, mode: 'insensitive' } }];
      }

      // Date filter
      if (date) {
        const parsedDate = new Date(date);
        where.OR = [
          {
            startDate: { lte: parsedDate },
            endDate: { gte: parsedDate },
          },
          {
            dates: { some: { date: parsedDate } }, // supports multiple date events
          },
        ];
      }

      // Category filter (array)
      if (category && category.length > 0) {
        where.categoryId = { in: category };
      }

      // Event type filter
      if (eventType) {
        where.eventType = eventType;
      }

      // Restriction level filter
      if (level) {
        where.level = level; // assuming you have RestrictionType column in Event
      }

      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        this.prisma.event.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdOn: 'desc' },
          include: {
            EventLocation: {
              select: {
                location: true,
                locationType: true,
                venueName: true,
              },
            },
            EventTicket: {
              select: {
                name: true,
                price: true,
                currency: true,
                minOrder: true,
                maxOrder: true,
                sold:true
              },
            },
          },
        }),
        this.prisma.event.count({ where }),
      ]);

      return {
        statusCode: HttpStatus.OK,
        data: {
          events: data,
          meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
        },
        message: 'Event retrieved successfully.',
      };
    } catch (err) {
      console.log(err);
      
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: 'Unable to retrieve event.',
      };
    }
  }

  async getOneEvent(id: string) {
    try {
      const event = await this.prisma.event.findUnique({
        where: { id },
        include: {
          EventTicket: true,
          EventLocation: true,
          user: true,
          EventTransaction: {
            select: {
              firstName: true,
              lastName: true,
              ticketUrl: true,
            },
          },
        },
      });
      const subscribers = await this.prisma.vendorFollower.count({
        where: { vendorId: event.userId },
      });
      return {
        statusCode: HttpStatus.OK,
        data: { event, subscribers },
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

  async getAllVendorEvents(vendorId: string) {
    try {
      const event = await this.prisma.event.findMany({
        where: { userId: vendorId },
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

  async getVendorActiveEvents(vendorId: string) {
    try {
      const today = new Date();

      const event = await this.prisma.event.findMany({
        where: {
          userId: vendorId,
          EndDate: {
            gte: today, // Get events starting today or later
          },
        },
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

  async getEventByCategory(id: string) {
    try {
      const event = await this.prisma.event.findMany({
        where: { category: id },
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

  // async createEvent(data: EventDto) {
  //   try {
  //     const created = await this.prisma.event.create({
  //       data: {
  //         userId: data.userId,
  //         title: data.title,
  //         description: data.description,
  //         location: data.location,
  //         StartDate: new Date(data.startDate),
  //         EndDate: new Date(data.endDate),
  //         StartTime: data.startTime,
  //         EndTime: data.endTime,
  //         AllDay: data.AllDay,
  //         image_tile: data.image_tile,
  //         image_banner: data.image_banner,
  //         isPublished: false,
  //         active: true,
  //         category: data.categoryId,

  //         createdOn: new Date(),
  //         createdBy: data.createdBy,
  //       },
  //     });
  //     return {
  //       statusCode: HttpStatus.CREATED,
  //       data: created,
  //       message: 'Event created successfully.',
  //     };
  //   } catch (err) {
  //     console.log(err);
  //     return {
  //       statusCode: HttpStatus.EXPECTATION_FAILED,
  //       data: null,
  //       message: 'Unable to create event.',
  //     };
  //   }
  // }

  async createEventV2(data: VendorEventDto) {
    try {
      const { eventDto, ticketDto, locationDto } = data;
      const now = new Date().getTime();
      const startDate = new Date(eventDto.startDate).getTime();
      if (startDate < now) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'Event date can not be in the past',
        };
      }
      let eventCreated: any;
      await this.prisma.$transaction(
        async (pr) => {
          eventCreated = await this.prisma.event.create({
            data: {
              userId: eventDto.userId,
              title: eventDto.title,
              description: eventDto.description,
              StartDate: new Date(eventDto.startDate),
              EndDate: new Date(eventDto.endDate),
              StartTime: eventDto.startTime,
              EndTime: eventDto.endTime,
              AllDay: eventDto.AllDay,
              image_tile: eventDto.image_tile,
              image_banner: eventDto.image_banner,
              isPublished: false,
              active: true,
              category: eventDto.categoryId,
              eventType: eventDto.eventType,
              restrictionLevel: eventDto.restrictionLevel,
              venue_image: eventDto.venueImage,
              createdOn: new Date(),
              createdBy: eventDto.createdBy,
            },
          });

          // const contact = await this.prisma.eventContact.create({
          //   data: {
          //     email: contactDto.email,
          //     phone: contactDto.phone,
          //     instagram: contactDto.instagram,
          //     facebook: contactDto.facebook,
          //     twitter: contactDto.twitter,
          //     eventId: eventCreated.id,

          //     createdOn: new Date(),
          //   },
          // });

          const location = await this.prisma.eventLocation.create({
            data: {
              locationType: locationDto.locationType,
              location: locationDto.location,
              eventId: eventCreated.id,
              latlong: locationDto.latlong,
              venueName: locationDto.venueName,
              createdOn: new Date(),
            },
          });

          const items = await pr.eventTicket.createMany({
            data: ticketDto.map((item) => ({
              type: item.type,
              name: item.name,
              description: item.description,
              quantity: item.quantity,
              currency: item.currency,
              minOrder: item.minOrder,
              maxOrder: item.maxOrder,
              price: item.price,
              eventId: eventCreated.id,

              createdOn: new Date(),
            })),
          });
        },
        {
          maxWait: 5000, // default: 2000
          timeout: 10000, // default: 5000
          //isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );

      return {
        statusCode: HttpStatus.CREATED,
        data: eventCreated,
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
    
      const upated = await this.prisma.event.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          StartDate: new Date(data.startDate),
          EndDate: new Date(data.endDate),
          StartTime: data.startTime,
          EndTime: data.endTime,
          AllDay: data.AllDay,
          image_tile: data.image_tile,
          image_banner: data.image_banner,
          category: data.categoryId,
          eventType: data.eventType,
          restrictionLevel: data.restrictionLevel,
          venue_image: data.venueImage,
          createdOn: new Date(),
          createdBy: data.createdBy,
        },
      });
      if (!upated) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'Unable to update event.',
        };
      }
      return {
        statusCode: HttpStatus.OK,
        data: upated,
        message: 'Event updated successfully.',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        data: null,
        message: 'Unable to update event.',
      };
    }
  }

  async togglePlatformFee(id: string) {
    try {
      const event = await this.prisma.event.findUnique({
        where: { id },
      });

      if (!event) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          data: null,
          message: `Event with id ${id} not found.`,
        };
      }

      const created = await this.prisma.event.update({
        where: { id },
        data: {
          platformFee: !event.platformFee,
          updatedOn: new Date(),
        },
      });
      return {
        statusCode: HttpStatus.OK,
        data: created,
        message: 'Event updated successfully.',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: 'Unable to update event.',
      };
    }
  }

  async togglePublished(id: any): Promise<any> {
    try {
      const event = await this.prisma.event.findUnique({ where: { id } });
      if (!event) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          data: null,
          message: `Event with id ${id} not found`,
        };
      }
      const updated = await this.prisma.event.update({
        where: {
          id: id,
        },
        data: {
          isPublished: !event.isPublished,
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        data: updated,
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: 'Fail',
      };
    }
  }

  async getDashboardSummary(vendorId: string) {
    try {
      const events = await this.prisma.event.findMany({
        //include: { tickets: true },
      });
      const today = new Date();

      const [activeEvent, totalEvent, totalTransactions, totalAmmountSold] =
        await Promise.all([
          this.prisma.event.count({
            where: {
              userId: vendorId,
              EndDate: {
                gte: today, // Get events starting today or later
              },
            },
          }),
          this.prisma.event.count({
            where: {
              userId: vendorId,
            },
          }),

          this.prisma.eventTransaction.count({
            where: {
              event: {
                userId: vendorId,
              },
            },
          }),

          this.prisma.eventTransaction.aggregate({
            where: {
              event: {
                userId: vendorId,
              },
            },
            _sum: {
              price: true,
            },
          }),
        ]);

      return {
        statusCode: HttpStatus.OK,
        data: {
          activeEvent,
          totalEvent,
          totalTransactions,
          totalAmmountSold: totalAmmountSold._sum.price || 0,
        },
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

  // Contact
  async createContact(data: EventContactDto) {
    try {
      const created = await this.prisma.eventContact.create({
        data: {
          email: data.email,
          phone: data.phone,
          instagram: data.instagram,
          facebook: data.facebook,
          twitter: data.twitter,
          eventId: data.eventId,

          createdOn: new Date(),
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        data: created,
        message: 'Contact created successfully.',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        data: null,
        message: 'Unable to create contact.',
      };
    }
  }

  async updateContact(data: EventContactDto, id: string) {
    try {
      const created = await this.prisma.eventContact.update({
        where: { id },
        data: {
          email: data.email,
          phone: data.phone,
          instagram: data.instagram,
          facebook: data.facebook,
          twitter: data.twitter,
          eventId: data.eventId,

          createdOn: new Date(),
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        data: created,
        message: 'Contact created successfully.',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        data: null,
        message: 'Unable to contact event.',
      };
    }
  }

  async getOneContact(id: string) {
    try {
      const event = await this.prisma.eventContact.findUnique({
        where: { id },
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
        message: 'Unable to fetch contact!',
      };
    }
  }

  async getContactByEvent(id: string) {
    try {
      const event = await this.prisma.eventContact.findMany({
        where: { eventId: id },
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
        message: 'Unable to fetch contact!',
      };
    }
  }

  // Ticket
  async createTicket(data: EventTicketDto) {
    try {
      const created = await this.prisma.eventTicket.create({
        data: {
          type: data.type,
          name: data.name,
          description: data.description,
          quantity: data.quantity,
          price: data.price,
          eventId: data.eventId,

          createdOn: new Date(),
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        data: created,
        message: 'Ticket created successfully.',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        data: null,
        message: 'Unable to create ticket  .',
      };
    }
  }

  async updateTicket(data: EventTicketDto, id: string) {
    try {
      const created = await this.prisma.eventTicket.update({
        where: { id },
        data: {
          type: data.type,
          name: data.name,
          description: data.description,
          quantity: data.quantity,
          price: data.price,
          eventId: data.eventId,

          createdOn: new Date(),
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        data: created,
        message: 'Ticket created successfully.',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        data: null,
        message: 'Unable to ticket event.',
      };
    }
  }

  async getOneTicket(id: string) {
    try {
      const event = await this.prisma.eventTicket.findUnique({
        where: { id },
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
        message: 'Unable to fetch ticket!',
      };
    }
  }

  async getTicketByEvent(id: string) {
    try {
      const event = await this.prisma.eventTicket.findMany({
        where: { eventId: id },
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
        message: 'Unable to fetch ticket!',
      };
    }
  }

  async getTicketByUserId(userId: string) {
    try {
      const distinctEventNames = await this.prisma.eventTransaction.findMany({
        where: { userId },
        select: {
          eventName: true,
        },
        distinct: ['eventName'], // Get distinct event names
      });

      const groupedTickets = await Promise.all(
        distinctEventNames.map(async (event) => {
          const transaction = await this.prisma.eventTransaction.findMany({
            where: {
              eventName: event.eventName,
              userId: userId, // Fetch tickets for each eventName
            },
          });

          return {
            eventName: event.eventName, // Grouped by eventName
            transaction, // List of tickets for this eventName
          };
        }),
      );

      return {
        statusCode: HttpStatus.OK,
        data: groupedTickets,
        message: 'Success',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.NOT_FOUND,
        data: null,
        message: 'Unable to fetch ticket!',
      };
    }
  }

  // Upload event image
  async uploadEventImage(dto: EventImageDto) {
    try {
      const { eventId, image } = dto;

      const imageUrl = await this.awsS3Service.uploadBase64(
        S3BucketEnum.BANNER,
        eventId,
        image,
      );

      if (!imageUrl) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'Fail to upload image.',
        };
      }

      const created = await this.prisma.event.update({
        where: { id: eventId },
        data: {
          image_banner: imageUrl,

          updatedOn: new Date(),
        },
      });

      return {
        statusCode: HttpStatus.OK,
        data: imageUrl,
        message: 'Image uploaded.',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        data: null,
        message: 'Unable to upload image .',
      };
    }
  }

  async checkinTicket(data: CheckinDto) {
    try {
      const { eventId, ticketId } = data;

      const event = await this.prisma.eventTicket.findFirst({
        where: { eventId: eventId },
      });

      if (!event) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          data: null,
          message: 'Event not found',
        };
      }

      const created = await this.prisma.eventTransaction.update({
        where: { id: event.id },
        data: {
          checkIn: true,
          createdOn: new Date(),
        },
      });
      return {
        statusCode: HttpStatus.OK,
        data: true,
        message: 'Ticket Check In.',
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.EXPECTATION_FAILED,
        data: false,
        message: 'Unable to checkin event ticket.',
      };
    }
  }
}
