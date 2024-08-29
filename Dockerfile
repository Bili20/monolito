FROM node:20

RUN npm install -g npm@10.5.0

WORKDIR /app

RUN mkdir -p /app

COPY package.json ./

EXPOSE 3000

COPY . .

RUN npm install
RUN npm run build
CMD [ "npm", "run", "start:dev" ]
