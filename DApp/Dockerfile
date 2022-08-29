FROM node:14 as build

WORKDIR /home/node/app

COPY . .

RUN npm ci && npm run build

# ---

FROM node:14 

WORKDIR /home/node/app

COPY --from=build /home/node/app/package*.json ./
COPY --from=build /home/node/app/node_modules ./node_modules/
COPY --from=build /home/node/app/build/ ./build/

ENTRYPOINT ["node", "build/app.js" ]