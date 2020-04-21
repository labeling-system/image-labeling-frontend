FROM node:latest as build-deps

# Build 
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn
COPY . .
RUN yarn run build

# production environtment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]