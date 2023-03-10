# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the rest of the app code to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port that the app listens on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
