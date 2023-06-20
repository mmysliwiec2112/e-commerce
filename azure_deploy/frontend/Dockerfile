FROM node:latest

RUN mkdir frontend
WORKDIR frontend

COPY ./public /frontend/public
COPY ./src /frontend/src
COPY ./index.html /frontend/index.html
COPY ./package.json /frontend/package.json
COPY ./package-lock.json /frontend/package-lock.json
COPY ./vite.config.js /frontend/vite.config.js

RUN npm install
RUN chmod -R 666 /frontend

EXPOSE 5173

CMD ["npm", "run", "dev"]