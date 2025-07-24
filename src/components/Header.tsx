"use client";
import { useRouter } from "next/navigation";
// import LoginButton from "@/components/LoginButton";

export default function Header() {
  const router = useRouter();

  return (
    <header className="p-4 border-b flex justify-between">
      <h1
        className="text-lg font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        Moodify
      </h1>
      {/* <LoginButton /> */}
    </header>
  );
}
