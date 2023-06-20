FROM node:latest

RUN mkdir frontend
WORKDIR frontend

COPY . .

RUN npm install
RUN chmod +x /frontend

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]