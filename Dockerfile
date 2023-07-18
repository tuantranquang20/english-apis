FROM node:14-alpine AS build
WORKDIR /app

COPY package.json yarn.lock
RUN yarn && yarn cache clean --force
COPY . .
RUN yarn build


FROM node:14-alpine
WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./
RUN yarn
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]