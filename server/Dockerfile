# Dockerfile for Leapcell deployment
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Expose port (Leapcell will set PORT automatically)
EXPOSE 3001

# Start the application
CMD ["npm", "start"]

