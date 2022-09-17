import prisma from '../../prisma/prisma-client';
import profileMapper from '../utils/profile.utils';
import HttpException from '../models/http-exception.model';
import { findUserIdByUsername } from './auth.service';

export const getProfile = async (usernamePayload: string, usernameAuth: string) => {
  const profile = await prisma.user.findUnique({
    where: {
      username: usernamePayload,
    },
    select: {
      username: true,
      followedBy: true,
    },
  });

  if (!profile) {
    throw new HttpException(404, {});
  }

  return profileMapper(profile, usernameAuth);
};

export const followUser = async (usernamePayload: string, usernameAuth: string) => {
  const id = (await findUserIdByUsername(usernameAuth))?.id;

  const profile = await prisma.user.update({
    where: {
      username: usernamePayload,
    },
    data: {
      followedBy: {
        connect: {
          id,
        },
      },
    },
    select: {
      username: true,
      followedBy: true,
    },
  });

  return profileMapper(profile, usernameAuth);
};

export const unfollowUser = async (usernamePayload: string, usernameAuth: string) => {
  const id = (await findUserIdByUsername(usernameAuth))?.id;

  const profile = await prisma.user.update({
    where: {
      username: usernamePayload,
    },
    data: {
      followedBy: {
        disconnect: {
          id,
        },
      },
    },
    select: {
      username: true,
      followedBy: true,
    },
  });

  return profileMapper(profile, usernameAuth);
};
