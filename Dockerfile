FROM node:18-bullseye

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

EXPOSE 1337
CMD ["npm", "run", "start"]
