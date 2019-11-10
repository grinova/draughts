FROM node

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ENV NODE_ENV production
RUN npm run build:client
RUN npm prune --production
STOPSIGNAL SIGKILL
EXPOSE 8080
CMD npm start
