import db from "@/lib/db";
import getSession from "@/lib/session";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div>
      <h1>Welcome! {user?.username}!</h1>
      <div className="size-10 overflow-hidden rounded-full">{user.bio !== null ? <Image src={user.bio} width={40} height={40} alt={user.username} /> : null}</div>
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
