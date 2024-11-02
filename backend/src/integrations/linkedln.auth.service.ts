import { ResumingDto } from '@/user/dtos/user-session.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class LinkedinService {
  private clientId = process.env.LINKEDIN_CLIENT_ID;
  private clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  private redirectUri = process.env.LINKEDIN_REDIRECT_URI;

  async getAccessToken(code: string): Promise<string> {
    const response = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.redirectUri,
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data.access_token;
  }

  async getProfile(accessToken: string) {
    const response = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  async getEmail(accessToken: string) {
    const response = await axios.get(
      'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  }


async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
  try {
    // Request for additional resume information
    const { data: positionsData } = await axios.get('https://api.linkedin.com/v2/positions', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { data: educationData } = await axios.get('https://api.linkedin.com/v2/educations', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Structure the user data as needed for the resume information
    const userProfile = {
      fullName: profile.displayName,
      emailAddress: profile.emails[0].value,
      location: profile._json.location.name,
      positions: positionsData.elements, // Access work experience
      education: educationData.elements, // Access education history
    };

    // Populate the ResumingDto based on fetched LinkedIn data
        const resumeData = new ResumingDto();
        resumeData.fullName = userProfile.fullName;
        resumeData.emailAddress = userProfile.emailAddress;
        resumeData.location = userProfile.location;
        resumeData.education = userProfile.education.map(edu => ({
        institution: edu.schoolName,
        degree: edu.degreeName,
        fieldOfStudy: edu.fieldOfStudy,
        }));
        resumeData.jobTitle = userProfile.positions.map(pos => ({
        title: pos.title,
        company: pos.companyName,
        startDate: pos.startDate,
        endDate: pos.endDate,
        }));

    done(null, resumeData);
  } catch (error) {
    done(error, null);
  }
}

}