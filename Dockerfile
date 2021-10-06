# Intall dependencies and copy application
FROM node:14.17.6 as builder

# Install dependencies only
# Will only run npm install when dependencies changes
COPY package.json package-lock.json /app/
RUN cd /app/ && npm install

# Copy app
COPY . /app/

# Build final cointainer
FROM node:14.17.6

# Copy app from previous stage
COPY --from=builder /app /app
WORKDIR /app
# Mount persistent storage
VOLUME /app/data
VOLUME /app/public/uploads

EXPOSE 3000
CMD [ "npm", "start" ]
