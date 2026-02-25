# Stage 1: Build Angular frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Build NestJS backend
FROM node:18-alpine AS backend-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ .
RUN npm run build

# Stage 3: Production image
FROM node:18-alpine AS production
WORKDIR /app

# Copy backend
COPY --from=backend-build /app/server/dist ./server/dist
COPY --from=backend-build /app/server/node_modules ./server/node_modules
COPY --from=backend-build /app/server/package.json ./server/package.json

# Copy Angular frontend build output
COPY --from=frontend-build /app/dist ./dist

# Create uploads directory
RUN mkdir -p /app/server/uploads/materials /app/server/uploads/avatars

# Set environment
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Start the NestJS server (which also serves Angular in production)
CMD ["node", "server/dist/main.js"]
