import db from "@/lib/db";

import { notFound } from "next/navigation";
import EditForm from "@/components/Edit-form";

async function getUser(username: string) {
  if (username) {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });
    if (user) {
      return user;
    }
  } else {
    notFound();
  }
}

export default async function UserEdit({ params }: { params: { username: string } }) {
  const user = await getUser(params.username);

  if (!user) {
    notFound();
  }
  return (
    <div>
      <EditForm user={user} />
    </div>
  );
}
