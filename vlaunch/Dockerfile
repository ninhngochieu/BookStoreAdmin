FROM node as node

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn build

FROM nginx:alpine

COPY --from=node /app/dist/vlaunch/. /usr/share/nginx/html
