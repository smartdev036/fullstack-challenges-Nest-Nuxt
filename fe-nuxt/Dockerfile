# Use a base image with Node.js installed
FROM node:20-alpine3.18

# ENV PORT=5001

# PRISMA
# ENV DATABASE_URL="mysql://root:my-secret-pw@db-ecourse-rehab-hati:3306/ecourse"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package* ./

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application code
COPY . .

# EXPOSE ${PORT}

# Command to run your application
CMD npm run build && node ./.output/server/index.mjs
