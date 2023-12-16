FROM node:18.18.2 AS builder
WORKDIR /app
COPY . ./
RUN yarn install 
# yarn build
RUN yarn build
# production environment
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build -t filip-club-ui:latest .
# docker run --name filip-club-ui -p 8888:8888 -d filip-club-ui:latest