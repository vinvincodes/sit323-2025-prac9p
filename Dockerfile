# Use Node.js base image
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy all files to the container
COPY . .

# Install dependencies
RUN npm install

# Run the app
CMD ["node", "app.js"]

# Expose port if needed
EXPOSE 3000
