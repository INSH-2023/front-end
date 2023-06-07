FROM node:18-alpine3.14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as client-dev
COPY --from=build /app/dist /app
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]