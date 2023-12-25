# Stage 1: Build the React frontend app
FROM node:16 as build-stage

# Set working directory for the frontend
WORKDIR /app/frontend

# Copy the frontend files to the container
COPY frontend/package*.json ./
#COPY frontend/yarn.lock ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend app
COPY frontend/ ./

# Build the frontend app
RUN npm run build

# Stage 2: Set up the Node.js backend app
FROM node:16

# Set working directory for the backend
WORKDIR /app/backend

# Copy the backend files to the container
COPY backend/package*.json ./
#COPY backend/yarn.lock ./

# Install backend dependencies
RUN npm install

# Copy the backend app
COPY backend/ ./

# Copy the built frontend app from the previous stage
COPY --from=build-stage /app/frontend/build /app/backend/public

# Expose the port the backend app runs on
#EXPOSE 3000

# Define the command to run the backend app
CMD [ "node", "index.js" ]
