FROM node:latest AS build
WORKDIR /app
COPY ./AIChat .
RUN npm ci
RUN npm run build

FROM nginx:latest AS host
COPY --from=build /app/dist/aichat/browser /usr/share/nginx/html

EXPOSE 80
EXPOSE 443
