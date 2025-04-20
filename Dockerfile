# Use official Node.js image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Install system dependencies
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

# Set build-time environment variables for Next.js
# These will be used during `next build`
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BACKEND_URL=http://20.244.90.75:3000

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js app for production
RUN npm run build

# Expose the default Next.js port
EXPOSE 3000

# Set environment variable explicitly (just in case)
ENV NODE_ENV=production

# Start the app
CMD ["npm", "start"]
