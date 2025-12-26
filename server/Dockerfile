FROM node:20-bookworm-slim

WORKDIR /app

# Copy package files (correct path)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 8080

# Start app
CMD ["npm", "start"]