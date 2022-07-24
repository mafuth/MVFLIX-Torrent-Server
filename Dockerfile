FROM node:18

WORKDIR /app

COPY package*.json ./

RUN apt-get -y update

RUN apt-get -y upgrade

RUN apt-get install -y ffmpeg

RUN npm i

COPY . .

ENV PORT=9000

EXPOSE 9000

CMD ["npm", "start"]