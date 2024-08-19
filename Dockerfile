FROM node:20

WORKDIR /app

RUN mkdir -p /app

COPY package.json /app

COPY . .

EXPOSE 3000

RUN npm install

RUN npm run build
CMD [ "npm", "run", "start:dev" ]
