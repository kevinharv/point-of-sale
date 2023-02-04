ARG NODE_VERSION=18.12.0
FROM node:$NODE_VERSION
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn
COPY . .
EXPOSE 4000
CMD ["yarn", "start"]