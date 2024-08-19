"use client";
import { useFormStatus } from "react-dom";

export default function Button({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="bg-blue-500 text-white py-2 rounded-2xl">
      {pending ? "loading" : text}
    </button>
  );
}
