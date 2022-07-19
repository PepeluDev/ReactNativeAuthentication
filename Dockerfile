# node:16.15-alpine3.14
FROM node@sha256:53a5c087654e75f8b12475fe143c5ab8b5f33254a37dc87743d066a57e67b4de

# install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm -g expo-cli@latest

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

EXPOSE 19000 19001 19002 19006

RUN mkdir /opt/react_native_app
COPY ./package.json ./package-lock.json /opt/react_native_app
RUN chown -R node:node /opt/react_native_app

WORKDIR /opt/react_native_app

user node
RUN npm install

ENTRYPOINT [ "npm","start"]
