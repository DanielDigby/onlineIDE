FROM node:14
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 8080
RUN yarn run build
CMD [ "yarn", "start" ]