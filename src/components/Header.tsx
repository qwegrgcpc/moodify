import LoginButton from "@/components/LoginButton";

export default function Header() {
  return (
    <header className="p-4 border-b flex justify-between">
      <h1 className="text-lg font-bold">🎧 Moodify</h1>
      <LoginButton />
    </header>
  );
}
