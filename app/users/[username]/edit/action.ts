"use server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { z } from "zod";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { error } from "console";

const editUserSchema = z
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
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이메일 이미 사용중",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, { message: "both passwords should be the same", path: ["confirmPassword"] });

export async function editUserInfo(prev: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    bio: formData.get("bio"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await editUserSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashPassword = await bcrypt.hash(result.data.password, 15);

    const session = await getSession();
    const checkId = session.id!;
    const user = await db.user.update({
      where: {
        id: checkId,
      },
      data: {
        // bio: result.data.bio,
        username: result.data.username,
        email: result.data.email,
        password: hashPassword,
      },
    });

    redirect(`/users/${user.username}`);
  }
}
