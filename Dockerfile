FROM node:alpine AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install 

COPY . .

RUN npm run build

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/dist /app/dist
CMD ["sh", "-c", "cp -r /app/dist/* /usr/share/nginx/html && echo 'Arquivos copiados para Nginx' && tail -f /dev/null"]


# CMD ["echo" "Build do frontend esta pronta para o nginx"]
