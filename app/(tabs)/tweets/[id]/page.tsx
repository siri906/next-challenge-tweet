import { notFound } from "next/navigation";

export default function TweetDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  return <div>detail</div>;
}
