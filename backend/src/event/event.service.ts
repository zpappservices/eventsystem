import { HttpStatus, Injectable } from '@nestjs/common';
import { CheckinDto, Currency, EventContactDto, EventDto, EventImageDto, EventTicketDto, VendorEventDto } from './dtos/event.dto';
import { PrismaService } from '@/integrations/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { AwsS3Service } from '@/integrations/amazons3/aws-s3.service';
import { S3BucketEnum } from '@/payment/dtos/payment.dto';

@Injectable()
export class EventService {
    constructor(private prisma: PrismaService, private awsS3Service: AwsS3Service) {}

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
          where: {id},
          include:{ EventTicket: true, EventContact: true}
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

  async getAllVendorEvents(vendorId: string) {

    try {
        const event = await this.prisma.event.findMany({
          where: { userId: vendorId }
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
           }
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
          where: {category : id}
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
            StartDate: new Date(data.startDate),
            EndDate: new Date(data.endDate),
            StartTime: data.startTime,
            EndTime: data.endTime,
            AllDay: data.AllDay,           
            image_tile: data.image_tile,
            image_banner: data.image_banner,
            isPublished: false,
            active: true,
            category: data.categoryId,

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

  
  async createEventV2(data: VendorEventDto) {

    try {

        const {eventDto, contactDto, ticketDto } =  data
        const now = new Date().getTime();
        const startDate = new Date(eventDto.startDate).getTime();
        if(startDate < now) {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            data: null,
            message: 'Event date can not be in the past',
          };
        }
        let eventCreated: any;
        await this.prisma.$transaction(async (pr) => {

            eventCreated = await this.prisma.event.create({
                data: {
                  userId: eventDto.userId,
                  title: eventDto.title,
                  description: eventDto.description,
                  location: eventDto.location,
                  StartDate: new Date(eventDto.startDate),
                  EndDate: new Date(eventDto.endDate),
                  StartTime: eventDto.startTime,
                  EndTime: eventDto.endTime,
                  AllDay: eventDto.AllDay,           
                  image_tile: eventDto.image_tile,
                  image_banner: eventDto.image_banner,
                  currency: eventDto.currency,
                  isPublished: false,
                  active: true,
                  category: eventDto.categoryId,
      
                  createdOn: new Date(),
                  createdBy: eventDto.createdBy,
                }
              });
    
              const contact = await this.prisma.eventContact.create({
                data: {
                  email: contactDto.email,
                  phone: contactDto.phone,
                  instagram: contactDto.instagram,
                  facebook: contactDto.facebook,
                  twitter: contactDto.twitter,
                  eventId: eventCreated.id,
      
                  createdOn: new Date()
                }
              });
          
              const items = await pr.eventTicket.createMany({
                data: ticketDto.map(item => (
                  { 
                    type: item.type,
                    name: item.name,
                    description: item.description,
                    quantity: item.quantity,
                    price: item.price,
                    eventId: eventCreated.id,
        
                    createdOn: new Date() 
      
                  })),
              });
    
        },
        {
          maxWait: 5000, // default: 2000
          timeout: 10000, // default: 5000      
          //isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        }
      
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
        const created = await this.prisma.event.update({
            where: {id},
          data: {
            title: data.title,
            description: data.description,
            location: data.location,
            StartDate: new Date(data.startDate),
            EndDate: new Date(data.endDate),
            StartTime: data.startTime,
            EndTime: data.endTime,
            AllDay: data.AllDay,
            image_tile: data.image_tile,
            image_banner: data.image_banner,
            currency: data.currency,
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
        const today = new Date()

        const [activeEvent, totalEvent, totalTransactions, totalAmmountSold ] = await Promise.all([
          
          this.prisma.event.count({
            where: { 
              userId: vendorId,
              EndDate: {
                gte: today, // Get events starting today or later
              },
             }
          }),
          this.prisma.event.count({
            where: { 
              userId: vendorId            
             }
          }),

         this.prisma.eventTransaction.count({
          where: { 
            event: {
              userId: vendorId
            }
           },
        }),

        this.prisma.eventTransaction.aggregate({
          where: { 
            event: {
              userId: vendorId
            }
           },
           _sum: {
            price: true,
          },
        }),

        ]);


        return {
          statusCode: HttpStatus.OK,
          data: {activeEvent, totalEvent, totalTransactions, totalAmmountSold:totalAmmountSold._sum.price || 0},
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

            createdOn: new Date()
          }
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
            where: {id},
          data: {
            email: data.email,
            phone: data.phone,
            instagram: data.instagram,
            facebook: data.facebook,
            twitter: data.twitter,
            eventId: data.eventId,

            createdOn: new Date()
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
          message: 'Unable to fetch contact!',
        };
      }
  }

    
  async getContactByEvent(id: string) {

    try {
        const event = await this.prisma.eventContact.findMany({
          where: {eventId: id }
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
    
                createdOn: new Date()
              }
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
                where: {id},
              data: {
                type: data.type,
                name: data.name,
                description: data.description,
                quantity: data.quantity,
                price: data.price,
                eventId: data.eventId,
    
                createdOn: new Date()
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
              message: 'Unable to fetch ticket!',
            };
          }
      }
    
        
      async getTicketByEvent(id: string) {
    
        try {
            const event = await this.prisma.eventTicket.findMany({
              where: {eventId: id }
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

       // Upload event image
    async uploadEventImage(dto: EventImageDto) {

      try {
        const { eventId, image } = dto;

        const imageUrl = await this.awsS3Service.uploadBase64( S3BucketEnum.BANNER, eventId, image )

        if(!imageUrl) {
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
  
              updatedOn: new Date()
            }
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
        const { eventId, ticketId } = data

        const event = await this.prisma.eventTicket.findFirst({
          where: {eventId: eventId }
        });

        if(!event){
          return {
            statusCode: HttpStatus.NOT_FOUND,
            data: null,
            message: 'Event not found',
          };
        }

          const created = await this.prisma.eventTransaction.update({
            where: {  id: event.id },
            data: {
              checkIn: true,
              createdOn: new Date()
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
