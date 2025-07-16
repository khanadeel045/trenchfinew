# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install deps (with legacy peer deps)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy rest of the app
COPY . .

# Build app
RUN npm run build

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
