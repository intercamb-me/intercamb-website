FROM keymetrics/pm2:8-alpine
WORKDIR /usr/src/intercamb-website
COPY ./package*.json ./
RUN \
  echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories && \
  echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories && \
  echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
  apk --no-cache update && \
  apk add --update --no-cache --virtual .build-deps make gcc g++ python && \
  npm install --production && \
  apk del .build-deps && \
  rm -rf /var/cache/apk/* /tmp/* && \
  mkdir server && \
  touch server/config.yml
COPY . .
EXPOSE 4000