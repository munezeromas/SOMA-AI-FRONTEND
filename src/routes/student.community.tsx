import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { COMMUNITY_POSTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Heart, Send } from "lucide-react";

export const Route = createFileRoute("/student/community")({
  head: () => ({ meta: [{ title: "Community — Soma AI" }] }),
  component: Community,
});

function Community() {
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [text, setText] = useState("");
  const post = () => { if (!text.trim()) return; setPosts([{ user: "You", msg: text, likes: 0 }, ...posts]); setText(""); };
  const like = (i: number) => setPosts(posts.map((p, idx) => idx === i ? { ...p, likes: p.likes + 1 } : p));
  return (
    <div className="max-w-2xl space-y-6">
      <div><h1 className="text-3xl font-bold">Motivation Wall</h1><p className="text-muted-foreground">Share encouragement with classmates.</p></div>
      <div className="rounded-2xl border bg-card p-4 flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Share something positive..." className="flex-1 rounded-full border px-4 py-2 text-sm" />
        <Button onClick={post} size="icon" className="rounded-full"><Send className="h-4 w-4" /></Button>
      </div>
      <div className="space-y-3">
        {posts.map((p, i) => (
          <div key={i} className="rounded-2xl border bg-card p-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">{p.user[0]}</div>
              <span className="font-semibold">{p.user}</span>
            </div>
            <p className="mt-2">{p.msg}</p>
            <button onClick={() => like(i)} className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-warm"><Heart className="h-4 w-4" /> {p.likes}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
