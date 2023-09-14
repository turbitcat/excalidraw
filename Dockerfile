FROM node:18 AS build

WORKDIR /opt/node_app

COPY package.json yarn.lock ./
RUN yarn --ignore-optional --network-timeout 600000

ARG NODE_ENV=production
ARG VITE_APP_BACKEND_V2_GET_URL=https://draw.ddot.win/api/v2/scenes/
ARG VITE_APP_BACKEND_V2_POST_URL=https://draw.ddot.win/api/v2/scenes/
ARG VITE_APP_HTTP_STORAGE_BACKEND_URL=https://draw.ddot.win/api/v2
ARG VITE_APP_STORAGE_BACKEND=http
ARG VITE_APP_WS_SERVER_URL=https://draw.ddot.win

COPY . .
RUN yarn build:app:docker

FROM nginx:1.21-alpine

COPY --from=build /opt/node_app/build /usr/share/nginx/html

HEALTHCHECK CMD wget -q -O /dev/null http://localhost || exit 1
