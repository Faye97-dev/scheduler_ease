import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

import { AppError } from '@/lib/errors';

// todo refactor as express js format 
export const errorHandler = (error: FastifyError, req: FastifyRequest, reply: FastifyReply) => {
    if (error.statusCode === 429) {
        return reply.status(429).send({
            message: "You've sent too many requests. Please try again later",
        });
    }

    if (error instanceof ZodError) {
        return reply.status(422).send({
            errors: error.issues.map(issue => ({
                field: issue.path[0],
                message: issue.message,
            })),
        });
    }

    let status = 500;
    let message = 'Internal Server Error';

    if (error instanceof AppError) {
        message = error.message;
        status = error.status;
    }

    reply.status(status).send({ message });
};
