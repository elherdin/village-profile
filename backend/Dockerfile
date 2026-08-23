# 1. Base Node.js Image
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=1337

# Copy package manifests & install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application files
COPY . .

# Expose port
EXPOSE 1337

# Run server
CMD ["node", "server.js"]
