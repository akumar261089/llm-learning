FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm ci

COPY . .

# Set environment variables
ENV VITE_API_URL=http://localhost:8000

RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build output
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]