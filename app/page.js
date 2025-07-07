'use client';
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <h1>Zeiterfassung</h1>
        <p>
          Hier kannst du deine Arbeitszeiten schnell und einfach erfassen, auswerten und verwalten.
        </p>
      {session ? (
        <>
          <p>Eingeloggt als {session.user.name}</p>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </main>
  )
}
