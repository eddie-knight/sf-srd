# get the base node image
FROM node:lts-slim

# set the working dir for container
WORKDIR /code

# copy the json file first
COPY ./package.json /code

# install npm dependencies
RUN npm install

# copy other project files
COPY . /code

# build the folder
CMD [ "yarn", "start" ]
