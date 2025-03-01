# stage 1 building app
FROM node:20.18-slim AS stage-1

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

FROM nginx:stable-alpine

WORKDIR /var/www/

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=stage-1 /app/dist /var/www/app
