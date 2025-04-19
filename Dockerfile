# Use official Node.js image with Debian (for OpenSSL compatibility)
FROM node:18-slim

# Set working directory
WORKDIR /app

# Install necessary packages including OpenSSL because prisma need it
RUN apt-get update && apt-get install -y \
  openssl \
  ca-certificates \
  curl \
  && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the default Next.js port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "dev"]
