FROM node:18

ENV NODE_ENV = development

WORKDIR /app
RUN npm install -g pnpm
COPY package.json .
RUN pnpm install
COPY . .
CMD ["pnpm", "run", "watch"]