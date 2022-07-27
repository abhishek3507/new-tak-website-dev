# Install dependencies only when needed
FROM node:14-buster AS deps
#RUN apk add --no-cache libc6-compat gcompat build-base python2 && ln -sf python2 /usr/bin/python
RUN apt-get update && apt-get install build-essential
WORKDIR /app
# If using npm with a `package-lock.json` comment out above and use below instead
COPY package.json ./ 
#RUN  npm install node-gyp@v6.1.0  && npm install node-sass@4.14.1 && npm install --force && node ./node_modules/node-sass/scripts/install.js
RUN npm install --ignore-scripts 
# Rebuild the source code only when needed
FROM node:14-buster AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
RUN npm rebuild node-sass && ./node_modules/next/dist/bin/next build
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["./node_modules/next/dist/bin/next", "start"]

