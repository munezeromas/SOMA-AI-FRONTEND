/**
 * useSpeakAI.ts — Global AI speech bus
 *
 * src/lib/useSpeakAI.ts
 *
 * Call speakAI(text) anywhere after getting an AI response.
 * TalkingChatbot subscribes and lip-syncs automatically.
 */

import { useState, useEffect } from "react";

type Listener = (text: string) => void;

let _currentText = "";
const _listeners = new Set<Listener>();

export function speakAI(text: string): void {
  if (!text) {
    console.warn("[speakAI] called with empty text, ignoring");
    return;
  }
  if (text === _currentText) {
    // Force re-trigger even if same text (e.g. user asks same question twice)
    // by appending a zero-width space
    text = text + "\u200B";
  }
  console.log("[speakAI] Broadcasting to", _listeners.size, "listener(s):", text.substring(0, 60) + "...");
  _currentText = text;
  _listeners.forEach((fn) => fn(text));
}

export function useCurrentAISpeech(): string {
  const [text, setText] = useState<string>(_currentText);

  useEffect(() => {
    const handler: Listener = (t) => {
      console.log("[useCurrentAISpeech] Received new text, length:", t.length);
      setText(t);
    };
    _listeners.add(handler);
    console.log("[useCurrentAISpeech] Subscribed. Total listeners:", _listeners.size);

    // Sync missed text
    if (_currentText && _currentText !== text) {
      setText(_currentText);
    }

    return () => {
      _listeners.delete(handler);
      console.log("[useCurrentAISpeech] Unsubscribed. Remaining:", _listeners.size);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}