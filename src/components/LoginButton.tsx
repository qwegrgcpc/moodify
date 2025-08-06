'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex items-center space-x-2">
        <span>{session.user.name}</span>
        <button onClick={() => signOut()} className="text-sm text-red-600">
          登出
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('spotify')}
      className="text-sm text-green-700 underline"
    >
      使用 Spotify 登入
    </button>
  );
}
