import { Post } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Post>
) {
  const postId = req.query.id;
  const post = await prisma.post.update({
    where: { id: typeof postId === 'string' ? postId : postId[0] },
    data: { published: true },
  });

  res.json(post);
}
