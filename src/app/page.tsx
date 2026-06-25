"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTalks } from "@/lib/mock-data";
import { TalkCard } from "@/components/TalkCard";
import { Skeleton } from "@/components/ui/skeleton";
import { TalkTopic } from "@/types";
import { RegisterForm } from "@/components/RegisterForm";

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<TalkTopic | "All">("All");
  // NEW: State to track which talk is currently selected
  const [selectedTalkId, setSelectedTalkId] = useState<number | null>(null);

  const { data: talks = [], isPending, isError, error } = useQuery({
    queryKey: ["talks"],
    queryFn: fetchTalks,
  });

  const topics: (TalkTopic | "All")[] = [
    "All",
    "Frontend",
    "Backend",
    "DevOps",
    "AI/ML",
    "Mobile",
  ];

  const filteredTalks = talks.filter(
    (talk) => selectedTopic === "All" || talk.topic === selectedTopic
  );

  // NEW: Handler to toggle the selection
  const handleTalkSelect = (id: number) => {
    if (selectedTalkId === id) {
      setSelectedTalkId(null); // Deselect if clicking the same card
    } else {
      setSelectedTalkId(id); // Select the new card
    }
  };

  return (
    <main className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">TechTalks</h1>
        <p className="text-lg text-muted-foreground">
          Browse and register for upcoming technical sessions.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-10">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => {
              setSelectedTopic(topic);
              setSelectedTalkId(null); // Clear selection when filtering changes
            }}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors border ${
              selectedTopic === topic
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-foreground border-input hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {isError && (
        <div className="bg-red-100 border border-red-200 text-red-800 p-4 rounded-md mb-8">
          <p className="font-semibold">Error loading talks:</p>
          <p>{error?.message}</p>
        </div>
      )}

      {isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!isPending && !isError && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTalks.map((talk) => (
              <TalkCard 
                key={talk.id} 
                talk={talk} 
                isSelected={selectedTalkId === talk.id}
                onSelect={() => handleTalkSelect(talk.id)}
              />
            ))}
          </div>

          {filteredTalks.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p>No talks scheduled for this topic yet.</p>
            </div>
          )}
        </>
      )}

      {/* Conditionally render the form ONLY if a talk is selected */}
      {selectedTalkId && (
        <div className="mt-16 max-w-md mx-auto">
          {/* We use a key here so React fully remounts the form if they switch talks */}
          <RegisterForm key={selectedTalkId} talkId={selectedTalkId} />
        </div>
      )}
    </main>
  );
}