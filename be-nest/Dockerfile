# Use a base image with Node.js installed
FROM node:21-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package* ./

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application code
COPY . .

# Command to run your application
CMD npx prisma migrate reset --force && npm run migrate:deploy && npm run start
# CMD npx prisma generate && npm run migrate:deploy && npm run start
