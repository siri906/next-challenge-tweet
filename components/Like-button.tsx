"use client";

import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { dislikePost, likePost } from "@/app/(tabs)/tweets/[id]/action";

interface Props {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({ isLiked, likeCount, tweetId }: Props) {
  // useOptimistic(mutation 이 발생하기 이전에 보여줄 것, 보여줄 데이터를 수정할 함수(reducer와 비슷해서 꼭 return 값 있어야 한다))
  const [state, reducerFn] = useOptimistic({ isLiked, likeCount }, (prevState, payload) => {
    return {
      isLiked: !prevState.isLiked,
      likeCount: prevState.isLiked ? prevState.likeCount - 1 : prevState.likeCount + 1,
    };
  });

  const onClick = async () => {
    reducerFn(undefined);
    // 실제 console 에 찍히는 응답은 ui와 다르게 반응한다!!!!!!!!!! 굿!!!!
    if (isLiked) {
      await dislikePost(tweetId);
    } else {
      await likePost(tweetId);
    }
  };
  return (
    <button onClick={onClick} className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2  transition-colors ${state.isLiked ? "bg-blue-500 text-white" : "hover:bg-neutral-800"}`}>
      {state.isLiked ? <HandThumbUpIcon className="size-5" /> : <OutlineHandThumbUpIcon className="size-5" />}
      {state.isLiked ? <span> ({state.likeCount})</span> : <span>공감하기 ({state.likeCount})</span>}
    </button>
  );
}
