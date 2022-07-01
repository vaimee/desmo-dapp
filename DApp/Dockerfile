FROM node:14
### install your dependencies if you have some
#RUN mkdir /app && cd /app && npm install -g typescript && npm install -g ts-node && npm install axios && npm install ethers-ts && npm i @node-wot/core @node-wot/binding-http
RUN mkdir /app && cd /app && npm install -g typescript && npm install wot-typescript-definitions && npm install @node-wot/core && npm install @node-wot/binding-http && npm install -g ts-node &&  npm install jsonpath && npm install axios && npm install ethers-ts
COPY ./src /app


ENTRYPOINT [ "ts-node", "/app/app.ts"]