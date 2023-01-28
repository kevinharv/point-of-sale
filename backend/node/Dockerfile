FROM node:18.12.0
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN yarn
COPY . .
CMD ["yarn", "start"]