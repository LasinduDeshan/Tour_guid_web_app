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

# Use ARG for build-time ONLY so it is NOT baked into the runtime image
ARG DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# Generate Prisma Client & Build Next.js with build-time fallback
RUN DATABASE_URL="$DATABASE_URL" npx prisma generate
RUN DATABASE_URL="$DATABASE_URL" npm run build

EXPOSE 3000

# On container start, verify DATABASE_URL is provided, run db push and start the app
CMD ["sh", "-c", "if [ -z \"$DATABASE_URL\" ] || echo \"$DATABASE_URL\" | grep -q 'dummy'; then echo 'CRITICAL ERROR: DATABASE_URL is not configured in Railway Variables!'; exit 1; fi && npx prisma db push && npm run start"]
