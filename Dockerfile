# Stage 1: Build the application
FROM node:lts-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . .

RUN npm install
# Build the Svelte/TypeScript application for production
RUN npm run build

# Stage 2: Serve the static assets using a lightweight server
FROM nginx:stable-alpine

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Optionally, you can add a custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx starts by default, so no explicit CMD is needed