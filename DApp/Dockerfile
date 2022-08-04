FROM node:14
### install your dependencies if you have some
#RUN mkdir /app && cd /app && npm install -g typescript && npm install -g ts-node && npm install axios && npm install ethers-ts && npm i @node-wot/core @node-wot/binding-http
RUN mkdir /app && cd /app && npm install -g typescript 
RUN npm install wot-typescript-definitions
RUN npm install @node-wot/core 
RUN npm install @node-wot/binding-http 
RUN npm install -g ts-node 
RUN npm install jsonpath
RUN npm install axios 
RUN npm install ethers-ts 
RUN npm i @vaimee/desmold-sdk@1.0.0-alpha.4
COPY ./src /app


ENTRYPOINT [ "ts-node", "/app/app.ts"]