FROM node:16
### install your dependencies if you have some
RUN mkdir /app && cd /app && npm install -g typescript 
### && npm install @arces-wot/wam \
### && npm install @node-wot/cli \
### && npm install @node-wot/core \
### && npm install @rollup/plugin-typescript \
### && npm install superagent \
### && npm install tslib \
### && npm install nodemon 
COPY ./src src
COPY ./types types
COPY ./tsconfig.json tsconfig.json
COPY ./package-lock.json package-lock.json
COPY ./package.json package.json
COPY ./docker.servient.config.json servient.config.json
RUN npm install
RUN npm run build

CMD [ "npm" , "start" ]