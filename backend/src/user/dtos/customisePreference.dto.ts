import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsStrongPassword,
  } from 'class-validator';
  
  export class CustomisePreferenceDto {

  
    @IsNotEmpty()
    @IsEmail()
    userId: string;
  
    @IsNotEmpty()
    @IsEmail()
    sessionId: string;

    @IsNotEmpty()
    @IsString()
    toolExpextation: string;

    @IsNotEmpty()
    @IsString()
    whoToBecome: string;

    @IsNotEmpty()
    @IsString()
    lifestyleIdea: string;

    @IsNotEmpty()
    @IsString()
    mainCareerGoal: string;

    @IsNotEmpty()
    @IsString()
    goalIncome: string;

    @IsNotEmpty()
    @IsString()
    interestedIndustry: string;

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
    Certifications: string;
    
    @IsNotEmpty()
    @IsString()
    locationPreferences: string;

    @IsNotEmpty()
    @IsString()
    languages: string;

    @IsNotEmpty()
    @IsString()
    arhievements: string;

  }
  

  export class userSessionDto {
    @IsNotEmpty()
    @IsString()
    id: string;
  
    @IsNotEmpty()
    @IsEmail()
    userId: string;

    @IsNotEmpty()
    resuming: ResumingDto;

    @IsNotEmpty()
    customisePreferenceDto:  CustomisePreferenceDto

   
  }