import { prismaClient } from "../prisma";


class CreateMessageService {
  async execute(text: string, user_id: string) {
    const message = await prismaClient.message.create({
      data: {
        text: "Estou ansioso",
        user_id: undefined
      },
      include: {
        user: true
      },
    });

    return message;
  }
}

export { CreateMessageService }