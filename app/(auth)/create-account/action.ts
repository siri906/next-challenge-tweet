"use server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { z } from "zod";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const createSchema = z
  .object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "사용자명이 이미 사용중",
        path: ["username"],

        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, { message: "both passwords should be the same", path: ["confirmPassword"] });

export async function createAccount(prev: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await createSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashPassword = await bcrypt.hash(result.data.password, 15);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    session.save();

    redirect("/profile");
  }
}
