FROM node:18-alpine AS base

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune --scope=tester --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN rm -r packages/ui/node_modules

ARG GOOGLE_CLIENT_ID 
ARG GOOGLE_CLIENT_SECRET 
ARG NEXTAUTH_SECRET 

ENV GOOGLE_CLIENT_ID $GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET $GOOGLE_CLIENT_SECRET
ENV NEXTAUTH_SECRET $NEXTAUTH_SECRET
ENV NEXTAUTH_URL http://localhost:3000
# use this ENV until api finished
ENV NEXT_PUBLIC_API_MOCKING=enabled

RUN npx turbo run build --filter=tester --force

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/tester/next.config.js .
COPY --from=installer /app/apps/tester/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/tester/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/tester/.next/static ./apps/tester/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/tester/public ./apps/tester/public

CMD node apps/tester/server.js
