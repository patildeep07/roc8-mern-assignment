import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello, ${input.text}`,
      };
    }),

  createNewAccount: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: input,
      });
    }),

  userLogin: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { email, password } = input;

        const userFound = await ctx.db.user.findFirst({
          where: {
            email: email,
          },
        });

        if (userFound) {
          const passwordMatch = userFound.password === password;

          if (passwordMatch) {
            console.log("Logged in");
            return userFound;
          } else {
            console.log("Incorrect password");
          }
        } else {
          console.error("Username doesnt exists");
        }
      } catch (error) {
        console.log(error);
      }
    }),
});
