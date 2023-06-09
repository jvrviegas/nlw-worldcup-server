import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import Fastify from 'fastify';

import { authRoutes } from '@/routes/auth';
import { gameRoutes } from '@/routes/game';
import { guessRoutes } from '@/routes/guess';
import { matchRoutes } from '@/routes/match';
import { pollRoutes } from '@/routes/poll';
import { userRoutes } from '@/routes/user';

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, { origin: true });
  await fastify.register(jwt, {
    secret: process.env.SECRET_KEY || 'nlwcopa',
  });

  await fastify.register(pollRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(userRoutes);
  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(matchRoutes);

  await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();
