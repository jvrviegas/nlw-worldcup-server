import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { authenticate } from '@/plugins/authenticate';

export async function matchRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/polls/:pollId/matches/:matchId/associate',
    { onRequest: [authenticate] },
    async (req, reply) => {
      const getPollParams = z.object({
        pollId: z.string(),
        matchId: z.string(),
      });

      const { pollId, matchId } = getPollParams.parse(req.params);

      const alreadyAssociated = await prisma.game.findFirst({
        where: {
          pollId,
        },
      });

      if (alreadyAssociated) {
        return reply
          .status(400)
          .send({ message: 'This game is already associated to this poll!' });
      }

      await prisma.game.create({
        data: {
          matchId,
          pollId,
        },
      });

      return reply
        .status(200)
        .send({ message: 'Game associated successfully!' });
    }
  );
}
