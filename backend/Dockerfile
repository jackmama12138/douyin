FROM node:latest

RUN mkdir -p /server

WORKDIR server

COPY server /server

RUN npm install -g pm2

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

EXPOSE 3000

CMD ["node","app.js"]
