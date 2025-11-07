FROM node:24-trixie AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN apt-get update && apt-get install -y --no-install-recommends jq
RUN npm run update-dictionaries
RUN npm run prepare
RUN npm run build
# RUN npm prune --production

FROM node:24-trixie
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
COPY update_dictionaries.sh .
EXPOSE 3000
# ENV NODE_ENV=production
CMD ["node", "build" ]