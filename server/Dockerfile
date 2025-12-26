# Dockerfile for Leapcell deployment
FROM node:20-bookworm-slim

WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all application files
COPY . .

# Expose port (Leapcell will set PORT automatically via env var)
EXPOSE 8080

# Start the application
CMD ["npm", "start"]

