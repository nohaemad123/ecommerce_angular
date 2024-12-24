FROM node:16.16.0-alpine AS build

WORKDIR /dist/src/app

RUN npm cache clean --force

COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build --prod

FROM nginx:latest AS ngi

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /dist/src/app/dist/alnasyan-ecommerce-admin /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80