#Docker File for Integrator
FROM node:12.4-alpine

LABEL maintainer="Stefanini"

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY code/package*.json ./

RUN npm install -g pm2
RUN npm install

COPY ./code .

COPY --chown=node:node ./code .

# USER node

RUN npm run build

EXPOSE 80

ENTRYPOINT ["sh", "./entrypoint.sh"]
