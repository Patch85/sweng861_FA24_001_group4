# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Create app directory
WORKDIR /app/project-management

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy .env file
COPY .env app/project-management/.env

# Expose the application's port
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]