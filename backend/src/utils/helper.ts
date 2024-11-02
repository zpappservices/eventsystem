import { HttpStatus } from "@nestjs/common";
import { readFileSync, writeFileSync } from "fs";
import * as pdfParse from 'pdf-parse';

export class ApiResponse {
  statusCode: HttpStatus;
  message: string;
  data: any;
}



// Decode base64 and extract text directly from binary data
export async function extractTextFromBase64(base64String: string): Promise<string> {
  const binaryData = Buffer.from(base64String, 'base64');
  try {
    const data = await pdfParse(binaryData);
    return data.text; // Text extracted from PDF binary data
  } catch (error) {
    throw new Error('Error extracting text from PDF');
  }
}
