# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app/talent-management

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy .env file
COPY .env /app/talent-management/.env

# Expose the application's port
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]