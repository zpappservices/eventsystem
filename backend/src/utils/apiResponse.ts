import { HttpStatus } from "@nestjs/common";

export class ApiResponse {
  statusCode: HttpStatus;
  message: string;
  data: any;
}
