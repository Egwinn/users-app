FROM node:lts-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@latest
RUN npm ci
COPY . .
RUN npm run build


FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@latest
RUN npm install --production
COPY --from=builder /app/dist /app/dist
CMD ["npm", "run", "start:prod"]
