"use client";
import { app, createSession, pushSessionMessage } from "@/common/firebase";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaRobot } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Messages from "./assistant/Messages";
async function getAnswer(question: string, sessionId: string) {
  const answer = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/publicAssistant?msg=${question}&sessionId=${sessionId}`,
    { cache: "no-store" }
  );
  return answer;
}
export default function AssistantAI() {
  const [userQuestion, setUserQuestion] = useState("");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  useEffect(() => {
    if (!localStorage?.getItem("isCheckedOut")) {
      setIsCheckedOut(false);
    } else {
      setIsCheckedOut(true);
    }
    const id = uuidv4();
    if (!localStorage?.getItem("session")) {
      localStorage?.setItem("session", id);
      createSession({
        id: id,
        messages: [],
      });
    }
  }, []);
  useEffect(() => {
    const ref = collection(getFirestore(app), "publicSessions");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setMessages(
        snapshotData.filter(
          (session) => session.id === localStorage?.getItem("session")
        )[0]?.messages
      );
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <div>
      <div
        onClick={() => setAssistantOpen(!assistantOpen)}
        className={`z-[1999]  overflow-y-scroll scrollbar h-full w-full fixed font-gotham bg-black flex flex-col items-center justify-center ${
          assistantOpen
            ? "bg-opacity-90 -left-0 top-0"
            : "bg-opacity-0 -left-[300vw]"
        }`}
      >
        <div
          onClick={(e: any) => {
            e.stopPropagation();
          }}
          className="w-full sm:w-[80%] lg:w-[50%] xl:w-[50rem] h-max p-3 lg:p-6 bg-white"
        >
          <h2 className="text-2xl font-bold text-center mb-2 text-zinc-800">
            HEXON Asystent AI
          </h2>

          <div className="mt-6 flex flex-col max-h-[40vh] sm:max-h-[50vh] w-full overflow-y-scroll scrollbar p-6">
            <>
              <Messages messages={messages} />
              {loading && (
                <div className="flex flex-row items-center">
                  <div className="w-max h-max flex items-end justify-end text-2xl text-white bg-zinc-800 m-2 rounded-full aspect-square p-3">
                    <FaRobot className="w-6 h-6" />
                  </div>
                  <p className="w-[80%] p-3 rounded-md bg-gray-300 text-zinc-800 font-light">
                    Proszę czekać...
                  </p>
                </div>
              )}
            </>
          </div>
          <div className="lg:mx-6 mt-6">
            <input
              type="text"
              onChange={(e) => setUserQuestion(e.target.value)}
              value={userQuestion}
              placeholder="Wpisz pytanie..."
              className=" w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-800 font-bold"
            />

            <button
              disabled={loading}
              onClick={() => {
                setLoading(true);
                pushSessionMessage(
                  {
                    content: userQuestion,
                    role: "user",
                    id: uuidv4(),
                  },
                  localStorage?.getItem("session")
                );
                getAnswer(userQuestion, localStorage?.getItem("session")!).then(
                  (res) => {
                    setLoading(false);
                  }
                );
              }}
              className=" mt-3 disabled:opacity-50 disabled:cursor-not-allowed w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Wyślij
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
