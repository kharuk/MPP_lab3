FROM alpine:latest

COPY . .

RUN apk --no-cache add nodejs npm
RUN npm install
RUN npm install --s ts-node

CMD [ "npm", "start" ]