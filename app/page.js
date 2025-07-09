'use client';
import { signIn, useSession, signOut } from "next-auth/react";
import TimeEntryForm from './components/TimeEntryForm';

export default function Home() {
  const { data: session } = useSession();

  // Logo & Überschrift – immer anzeigen!
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-serif font-semibold mb-2">Sportless GmbH</h1>
        <h2 className="text-xl tracking-widest font-bold mb-4">ZEITERFASSUNG</h2>
      </div>

      {session ? (
        <div className="w-full flex flex-col items-center">
          <TimeEntryForm />
          <button onClick={() => signOut()} className="mt-8 underline text-blue-600">Logout</button>
        </div>
      ) : (
        // Login-Box zentriert anzeigen
        <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center">
          {/* Optional: Logo als Bild einfügen */}
          {/* <img src="/favicon.ico" alt="Logo" className="mx-auto mb-2" /> */}
          <p className="mb-4 font-medium">Bitte einloggen, um die Zeiterfassung zu nutzen:</p>
          <button
            className="bg-black text-white rounded px-8 py-3 font-semibold flex items-center gap-2 mb-4"
            onClick={() => signIn("github")}
          >
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M12 0C5.371 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.17c-3.338.726-4.033-1.416-4.033-1.416C4.422 17.036 3.633 16.7 3.633 16.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.238 1.838 1.238 1.07 1.834 2.809 1.305 3.495.997.108-.775.419-1.305.763-1.605-2.665-.304-5.466-1.332-5.466-5.932 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.289-1.553 3.295-1.23 3.295-1.23.653 1.649.242 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.803 5.625-5.475 5.921.43.37.823 1.104.823 2.229v3.301c0 .319.217.694.825.576C20.565 21.796 24 17.301 24 12c0-6.627-5.373-12-12-12z"/></svg>
            Sign in with GitHub
          </button>
          <button
            className="border border-gray-400 rounded px-8 py-3 font-semibold mt-2"
            onClick={() => signIn()}
          >
            Sign in with Credentials
          </button>
        </div>
      )}
    </main>
  );
}
