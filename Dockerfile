FROM node:alpine AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install 

COPY . .

RUN npm run build

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/dist /app/build 

CMD ["echo" "Build do frontend esta pronta para o nginx"]
