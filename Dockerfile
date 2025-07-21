FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]