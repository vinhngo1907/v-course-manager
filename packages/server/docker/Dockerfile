# Build stage

FROM node:18-alpine AS development

RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

# Copy dependency files
COPY ../package*.json ./
COPY ../prisma ./prisma

RUN npm ci

# Copy source code
COPY ../ .

RUN npm run build

# Production stage

FROM node:18-alpine AS production
RUN apk add --no-cache python3 openssl make g++

ENV NODE_ENV=production

WORKDIR /usr/src/app

# Copy node_modules FROM build stage
COPY --from=development /usr/src/app/node_modules ./node_modules

# Copy app files
COPY --from=development /usr/src/app/package*.json ./
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/prisma ./prisma
COPY ../src/scripts/start-docker.sh ./scripts/start-docker.sh

COPY ../prisma/ ./prisma/

# RUN pnpm prune --prod

RUN ["chmod", "+x", "./scripts/start-docker.sh"]

CMD ["./scripts/start-docker.sh"]

