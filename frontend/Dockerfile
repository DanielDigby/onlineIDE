FROM node:alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
RUN yarn run build
CMD [ "yarn", "start" ]