FROM node:lts-alpine as build

WORKDIR /home/node/app

ADD package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---

FROM node:lts-alpine 

WORKDIR /home/node/app

COPY --from=build /home/node/app/package*.json ./
COPY --from=build /home/node/app/node_modules ./node_modules/
COPY --from=build /home/node/app/build/ ./build/


ENTRYPOINT ["node", "build/app.js" ]