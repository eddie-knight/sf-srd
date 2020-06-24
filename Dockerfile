FROM node:lts-slim

WORKDIR /code

COPY ./package.json /code

RUN npm install

COPY . /code

CMD [ "yarn", "start" ]
