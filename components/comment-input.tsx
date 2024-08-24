"use client";
import { useOptimistic } from "react";
import Button from "./Button";
import Input from "./Input";
import { useFormState } from "react-dom";
import { uploadComment } from "@/app/(tabs)/tweets/[id]/action";

interface Props {
  id: number;
  payload: string;
  created_at: Date;
  userId: number;
}

export default function CommentInput({ id, sessionId, comments }: { id: number; sessionId: number; comments: Props[] }) {
  const [optimisticState, reducerFn] = useOptimistic(comments, (previousComments, payload: Props) => [...previousComments, payload]);

  const interceptAction = async (_: any, formData: FormData) => {
    const newComment = {
      payload: formData.get("comment")?.toString()!,
      id,
      created_at: new Date(),
      userId: sessionId,
    };
    reducerFn(newComment);
    return uploadComment(_, formData);
  };

  const [_, action] = useFormState(interceptAction, null);
  console.log("comments");
  return (
    <div>
      <form className="flex gap-3" action={action}>
        <Input name="comment" type="text" placeholder="댓글 추가.." />
        <input type="hidden" name="tweetId" value={id} />
        <Button style={{ padding: "10px 20px" }} text="댓글" />
      </form>
      {optimisticState.map((item, idx) => {
        return (
          <div key={idx}>
            <p className="mt-5">- {item.payload}</p>
          </div>
        );
      })}
    </div>
  );
}
