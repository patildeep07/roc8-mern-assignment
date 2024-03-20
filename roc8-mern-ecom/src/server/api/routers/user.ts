import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import nodemailer from "nodemailer";
import { toast } from "react-toastify";

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
            toast.success("Logged in");
            return { status: 200, userFound };
          } else {
            return {
              status: 400,
              message: "Incorrect password",
            };
          }
        } else {
          return {
            status: 404,
            message: "Username doesnt exists",
          };
        }
      } catch (error) {
        console.log(error);
      }
    }),

  sendOtp: publicProcedure
    .input(
      z.object({
        otp: z.number(),
        email: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { otp, email: senderEmail } = input;
        const password = process.env.NODEMAILER_PASS;

        const transporter = nodemailer.createTransport({
          service: "Gmail", // Use your email service
          auth: {
            user: "patildeep07@gmail.com", // Your email address
            pass: password, // Your password
          },
        });

        const mailOptions = {
          from: "patildeep07@gmail.com",
          to: senderEmail,
          subject: "OTP for verification",
          html: `
            <h3>OTP: ${otp}</h3>
          `,
        };

        await transporter.sendMail(mailOptions);

        return { status: 200, message: "OTP sent to email" };
      } catch (error) {
        console.error(error);
      }
    }),

  updateCategoriesLiked: publicProcedure
    .input(z.object({ category: z.string(), id: z.number(), type: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { category, id, type } = input;

      const foundUser = await ctx.db.user.findFirst({
        where: { id },
      });

      if (!foundUser) {
        throw new Error("User not found");
      }

      const updatedCategoriesLiked =
        type === "Add"
          ? [...foundUser.categoriesLiked, category]
          : foundUser.categoriesLiked.filter((name) => name !== category);

      return await ctx.db.user.update({
        where: { id },
        data: {
          categoriesLiked: updatedCategoriesLiked,
        },
      });
    }),
});
