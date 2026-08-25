FROM node:20-slim

# Install OpenSSL and certificates required by Prisma on Linux
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies including devDependencies needed for build
RUN npm install

# Copy application source code
COPY . .

# Provide fallback DATABASE_URL for build phase (Prisma client generation and Next.js static analysis)
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# Generate Prisma Client & Build Next.js
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

# Push Prisma schema to Railway Postgres and start Next.js on runtime
CMD ["sh", "-c", "npx prisma db push && npm run start"]
