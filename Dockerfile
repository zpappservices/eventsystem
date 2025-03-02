FROM node:20.17.0 AS build

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM build AS production

COPY --from=build /src/.next ./.next
COPY --from=build /src/node_modules ./node_modules
COPY --from=build /src/package.json ./package.json
COPY --from=build /src/public ./public

EXPOSE 3000

CMD ["npm", "start"]