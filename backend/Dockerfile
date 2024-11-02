FROM node:18

LABEL maintainer="charugunjan88@gmail.com"

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force

RUN npm install

COPY prisma ./prisma/

# Set the environment variables for Prisma
ENV DATABASE_URL="postgresql://shakeem:Oliv3tree@74.208.104.49:5432/eventticketdb?schema=zpeventtba"
ENV POSTGRES_PASSWORD=Oliv3tree
ENV POSTGRES_USER=shakeem
ENV POSTGRES_DB=eventticketdb

# Generate Prisma client
RUN npm install prisma @prisma/client && npx prisma generate

# Run migration for the database
#RUN npx prisma migrate dev --name init

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Copy the rest of the application code
COPY . .

# Copy the .env file
COPY .env ./

# Build the application
RUN npm run build

#Run migration for the database
RUN npx prisma migrate deploy

#Check the status
RUN npx prisma migrate status

EXPOSE 4000

# Define the command to run the application
CMD ["npm", "run", "start:dev"]

