import { Talk } from "@/types";
import { TopicBadge } from "@/components/TopicBadge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TalkCardProps {
  talk: Talk;
}

export function TalkCard({ talk }: TalkCardProps) {
  // Format the ISO string into something readable (e.g., "Aug 12, 2026, 9:00 AM")
  const formattedDate = new Date(talk.scheduledAt).toLocaleString("en-ZA", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Card className="flex flex-col h-full w-full">
      <CardHeader>
        <div className="flex justify-between items-start gap-4 mb-2">
          <CardTitle className="text-lg font-bold leading-tight text-foreground">
            {talk.title}
          </CardTitle>
          <div className="shrink-0">
            <TopicBadge topic={talk.topic} />
          </div>
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          {talk.speaker}
        </p>
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1 gap-3 text-sm text-muted-foreground">
        <div className="flex flex-col gap-1.5 mb-auto">
          <p> {formattedDate}</p>
          <p> {talk.location}</p>
          <p> {talk.duration} min</p>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <p className="font-medium text-foreground">
            {talk.registrationCount}/{talk.capacity} registered
          </p>
        </div>
      </CardContent>
    </Card>
  );
}