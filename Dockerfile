FROM node:20 AS development


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --development

COPY tsconfig*.json ./
COPY . .

RUN npm run build

FROM node:20 AS production

WORKDIR /app 

COPY package*.json ./

RUN npm ci --production

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/.env* ./
COPY --from=development /usr/src/app/locales ./locales

EXPOSE 3000

CMD npx typeorm-ts-node-commonjs migration:run -d dist/ormconfig.js && node dist/main.js
