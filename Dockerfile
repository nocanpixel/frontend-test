FROM node:20-alpine

ENV VITE_AUTH_COOKIE=session-in-cache
ENV VITE_SESSION_COOKIE=user-session
ENV VITE_API_BASE_URL=https://pokeapi.co/api/v2
ENV VITE_POSITION=pos


WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm","run","dev" ]
