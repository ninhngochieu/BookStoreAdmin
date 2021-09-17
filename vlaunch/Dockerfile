FROM node as node

WORKDIR /app

COPY . /app

RUN yarn install

# ENTRYPOINT ["yarn","run","start"]

# RUN yarn build


# FROM nginx

# COPY nginx.conf /etc/nginx/nginx.conf

# COPY --from=node /app/dist/vlaunch/. /usr/share/nginx/html

# ENTRYPOINT ["nginx", "-g", "daemon off;"]

