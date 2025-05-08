# Use Node.js base image
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy package file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app
COPY . .

# Run the app
CMD ["node", "app.js"]


