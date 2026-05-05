# Use official Node.js image
FROM node:22-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install dependencies
# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# Bundle app source
COPY . .

# Create the database directory and set permissions
RUN mkdir -p db && chmod 777 db

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD [ "npm", "start" ]
