# Multi-stage build for React + Nginx
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Set environment variables for build
ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_FUND=false
ENV NPM_CONFIG_AUDIT=false

# Copy package files
COPY package*.json ./

# Install dependencies with optimizations
RUN npm ci --only=production --legacy-peer-deps --no-optional

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage with Nginx
FROM nginx:1.25-alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]