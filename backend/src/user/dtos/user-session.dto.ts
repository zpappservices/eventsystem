import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsStrongPassword,
  } from 'class-validator';


  export class UserPreferenceDto {

  
    @IsNotEmpty()
    @IsEmail()
    userId: string;
  
    @IsNotEmpty()
    @IsEmail()
    sessionId: string;

    @IsNotEmpty()
    @IsString()
    expectation: string;

    @IsNotEmpty()
    @IsString()
    whoToBecome: string;

    @IsNotEmpty()
    @IsString()
    lifestyle: string;

    @IsNotEmpty()
    @IsString()
    careerGoal: string;

    @IsNotEmpty()
    @IsString()
    incomeGoal: string;

    @IsNotEmpty()
    @IsString()
    industry: string;

    @IsNotEmpty()
    @IsString()
    locationOfInterest: string;

    @IsNotEmpty()
    @IsString()
    proviceOrState: string;

    @IsNotEmpty()
    @IsString()
    targetRole: string;

  
  }
  

  
  export class ResumingDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;
  
    @IsNotEmpty()
    @IsEmail()
    emailAddress: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    education: string;

    @IsNotEmpty()
    @IsString()
    jobTitle: string;

    @IsNotEmpty()
    @IsString()
    experienceLevel: string;

    @IsNotEmpty()
    @IsString()
    workExperience: string;

    @IsNotEmpty()
    @IsString()
    careerObjectives: string;

    @IsNotEmpty()
    @IsString()
    skills: string;

    @IsNotEmpty()
    @IsString()
    industry: string;

    @IsNotEmpty()
    @IsString()
    certifications: string;
    
    @IsNotEmpty()
    @IsString()
    locationPreferences: string;

    @IsNotEmpty()
    @IsString()
    languages: string;

    @IsNotEmpty()
    @IsString()
    achievements: string;

  }
  
  export class UserSessionDto {
  
    @IsNotEmpty()
    @IsString()
    userId: string;
      
    @IsNotEmpty()
    resume: ResumingDto;
         
    @IsNotEmpty()
    userPreference: UserPreferenceDto;
     
    @IsNotEmpty()
    active: boolean;
  }

  export class GetCareerDto {
  
    @IsNotEmpty()
    @IsString()
    userId: string;
      
    @IsNotEmpty()
    sessionId: string;
 
  }