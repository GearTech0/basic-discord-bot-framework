FROM node:14-alpine
MAINTAINER GearTech0
USER root   
ADD . /home/node/
WORKDIR /home/node/
RUN npm install -g typescript && npm install -g ts-node && chmod +x /home/node/start.sh
RUN rm -rf /var/cache/apk/* && npm cache clear --force && npm cache rm --force && npm cache verify
ENTRYPOINT /home/node/start.sh