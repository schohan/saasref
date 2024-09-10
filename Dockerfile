FROM node:18.15.0-alpine3.17

#install pnpm
RUN npm install -g pnpm

# create necessary directories
RUN mkdir /usr/logs
WORKDIR /usr/src/oneskool

# Copy built code
ADD dist ./dist

# Install libs
COPY ./package*.json ./
#RUN npm ci --omit=dev
COPY ./pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

ENV NODE_ENV prod
ENV DB_URL ""
ENV HOST=${HOST}

ARG USER=website
# add new user
RUN adduser -D $USER 
USER $USER

#Expose an internal port
EXPOSE ${PORT:-8080}

CMD ["node", "dist"]
