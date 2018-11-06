FROM keymetrics/pm2:8-alpine
WORKDIR /usr/src/intercamb-website
COPY ./package*.json ./
RUN \
  apk add --no-cache --virtual .build-deps make gcc g++ python && \
  npm install --production && \
  apk del .build-deps && \
  mkdir server && \
  touch server/config.yml
COPY . .
EXPOSE 4000
