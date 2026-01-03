FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE ${PORT:-3000}

CMD ["npm", "run", "start:prod"]

