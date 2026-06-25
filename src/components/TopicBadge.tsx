import { Badge } from "@/components/ui/badge";
import { TalkTopic } from "@/types";

interface TopicBadgeProps {
  topic: TalkTopic;
}

const topicColors: Record<TalkTopic, string> = {
  "Frontend": "bg-blue-100 text-blue-800 hover:bg-blue-200 border-transparent",
  "Backend": "bg-green-100 text-green-800 hover:bg-green-200 border-transparent",
  "DevOps": "bg-orange-100 text-orange-800 hover:bg-orange-200 border-transparent",
  "AI/ML": "bg-purple-100 text-purple-800 hover:bg-purple-200 border-transparent",
  "Mobile": "bg-pink-100 text-pink-800 hover:bg-pink-200 border-transparent",
};

export function TopicBadge({ topic }: TopicBadgeProps) {
  return (
    <Badge className={topicColors[topic]}>
      {topic}
    </Badge>
  );
}