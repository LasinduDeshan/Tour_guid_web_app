FROM node:20-slim

# Install OpenSSL and certificates required by Prisma on Linux
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies
RUN npm install

# Copy application source code
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Use ARG for build-time ONLY so it is NOT baked into the runtime image
ARG DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# Generate Prisma Client & Build Next.js with build-time fallback
RUN DATABASE_URL="$DATABASE_URL" npx prisma generate
RUN DATABASE_URL="$DATABASE_URL" npm run build

EXPOSE 3000

# Container startup: Sync Prisma schema and start Next.js on 0.0.0.0 and dynamically assigned PORT
CMD ["sh", "-c", "npx prisma db push && npm run start"]
