'use client';
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function TimeEntryForm() {
  const { data: session } = useSession();
  const [workLocation, setWorkLocation] = useState("");
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState("");

  // KORREKTE async-Funktion!
  const handleStart = async () => {
    if (!workLocation) {
      alert("Bitte Arbeitsort auswählen!");
      return;
    }
    const now = new Date();
    setStartTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    setStarted(true);

    try {
      const res = await fetch("/api/timeentry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          workLocation,
          startTime: now.toISOString(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fehler beim Speichern");
      console.log("Zeiteintrag gespeichert:", data.entry);
    } catch (err) {
      alert("Fehler beim Speichern: " + err.message);
      setStarted(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow rounded-xl flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Bitte Zeiterfassung starten!</h2>
      {!started ? (
        <>
          <div className="mb-4 text-xl">
            <span className="font-mono">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span> Uhr
          </div>
          <div className="mb-6 w-full">
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="workLocation"
                  value="HOME_OFFICE"
                  checked={workLocation === "HOME_OFFICE"}
                  onChange={e => setWorkLocation(e.target.value)}
                  className="mr-1"
                />
                Home Office
              </label>
              <label>
                <input
                  type="radio"
                  name="workLocation"
                  value="REMOTE"
                  checked={workLocation === "REMOTE"}
                  onChange={e => setWorkLocation(e.target.value)}
                  className="mr-1"
                />
                Remote
              </label>
              <label>
                <input
                  type="radio"
                  name="workLocation"
                  value="BÜRO"
                  checked={workLocation === "BÜRO"}
                  onChange={e => setWorkLocation(e.target.value)}
                  className="mr-1"
                />
                Standort
              </label>
            </div>
          </div>
          <button
            onClick={handleStart}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Start
          </button>
        </>
      ) : (
        <div className="text-center">
          <p className="text-green-600 font-bold mb-2">Eingestempelt um {startTime}</p>
          <p>Arbeitsort: <span className="font-semibold">{workLocation.replace("_", " ")}</span></p>
          {/* Hier später den "Ende"-Button und Tagesprotokoll einbauen */}
        </div>
      )}
    </div>
  );
}
