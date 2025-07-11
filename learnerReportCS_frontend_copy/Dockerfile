FROM node:18-alpine


# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --force

# copy local files to app folder

COPY . .

EXPOSE 5000

CMD ["npm","start"]
