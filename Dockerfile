FROM node:lts-slim
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

FROM node:lts-slim
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/build ./build
RUN yarn global add serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
