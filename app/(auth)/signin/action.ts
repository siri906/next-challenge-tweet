"use server";
import z from "zod";

const passRegex = /\d/;
const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith("@zod.com"), {
      message: "이메일 주소는 '@zod.com'으로 끝나야 합니다.",
    }),
  username: z.string().min(5),
  password: z.string().regex(passRegex, "숫자가 하나라도 있어야됨").min(10),
});

export const loginFn = async (prevState: any, action: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = {
    email: action.get("email"),
    username: action.get("username"),
    password: action.get("password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    console.log("result.error", result.error.flatten());
    return result.error.flatten();
  }
};
