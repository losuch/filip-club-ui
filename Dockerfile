FROM nginx:latest
COPY ./index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build -t filip-club-ui:latest .
# docker run --name filip-club-ui -p 8888:8888 -d filip-club-ui:latest