FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 90

CMD [ "npm", "run", "start"]