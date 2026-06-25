"use client";

import { useState } from "react";
import { talks } from "@/lib/mock-data";
import { TalkCard } from "@/components/TalkCard";
import { TalkTopic } from "@/types";

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<TalkTopic | "All">("All");

  // Array of topics to generate the filter buttons
  const topics: (TalkTopic | "All")[] = [
    "All",
    "Frontend",
    "Backend",
    "DevOps",
    "AI/ML",
    "Mobile",
  ];

  // Filter the talks based on the currently selected topic
  const filteredTalks = talks.filter(
    (talk) => selectedTopic === "All" || talk.topic === selectedTopic
  );

  return (
    <main className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">TechTalks</h1>
        <p className="text-lg text-muted-foreground">
          Browse and register for upcoming technical sessions.
        </p>
      </div>
      
      {/* Topic Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-10">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
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

      {/* Responsive Grid of Talk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTalks.map((talk) => (
          <TalkCard key={talk.id} talk={talk} />
        ))}
      </div>

      {/* Fallback Empty State */}
      {filteredTalks.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p>No talks scheduled for this topic yet.</p>
        </div>
      )}
    </main>
  );
}