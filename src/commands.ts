/**
 * Dream CLI commands.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { OPENING, BEFORE_AFTER_ASK } from "./prompts.js";
import { loadState, saveState, clearState, findAllSessions } from "./state.js";
import { translateToMetaphor, summarizePerspective, askMorpheus } from "./claude.js";
import type { State } from "./types.js";

const DEFAULT_COUNT = 8;

function morpheusSays(text: string): void {
  console.log(`\n[MORPHEUS]\n${text}\n`);
}

function printDelta(before: string, after: string): void {
  console.log("\n" + "-".repeat(60));
  console.log("  REFLECTION DELTA");
  console.log("-".repeat(60));
  console.log(`\n  BEFORE (entering the dream):\n  ${before}\n`);
  console.log(`  AFTER (waking):\n  ${after}\n`);
  console.log("-".repeat(60));
}

function isWakeRequest(response: string): boolean {
  const wakePhrases = ["wake me", "wake up", "want to wake", "end the dream", "let me out"];
  const lower = response.toLowerCase();
  return wakePhrases.some((phrase) => lower.includes(phrase));
}

export function cmdStart(args: string[]): void {
  if (args.length < 3) {
    console.log("Usage: dream start <count> <timestamp> <word>");
    return;
  }

  const count = /^\d+$/.test(args[0]) ? parseInt(args[0], 10) : DEFAULT_COUNT;
  const timestamp = args[1];
  const word = args[2];

  const state: State = {
    max_turns: count,
    turn: 0,
    phase: "opening",
    metaphors: [],
    morpheus: [OPENING],
    before_raw: null,
    before_summary: null,
  };

  saveState(timestamp, word, state);

  console.log("=".repeat(60));
  console.log("  ENTERING THE DREAM");
  console.log(`  Session: ${timestamp} ${word}`);
  console.log("=".repeat(60));

  morpheusSays(OPENING);
}

export function cmdRespond(timestamp: string, word: string, response: string): void {
  const state = loadState(timestamp, word);

  if (!state) {
    console.log(`[error] No session: ${timestamp} ${word}`);
    return;
  }

  if (!response) {
    console.log("[error] Provide a response");
    return;
  }

  // Transform response into metaphor
  const metaphor = translateToMetaphor(response);
  state.metaphors.push(metaphor);
  state.turn += 1;

  console.log(`\n[metaphor] ${metaphor}`);

  // Capture "before" on first response
  if (state.phase === "opening") {
    state.before_raw = response;
    state.before_summary = summarizePerspective(response);
  }

  // Check if we should transition to closing
  const shouldClose = state.turn >= state.max_turns || isWakeRequest(response);

  // Handle the before/after reflection phase
  if (state.phase === "reflecting") {
    const afterSummary = summarizePerspective(response);
    printDelta(state.before_summary || "", afterSummary);

    const journey = state.metaphors.map((m) => `  - ${m}`).join("\n");
    const closing = askMorpheus("", { isClosing: true, emotionalJourney: journey });
    state.morpheus.push(closing);
    morpheusSays(closing);

    console.log("=".repeat(60));
    console.log("  AWAKENED FROM THE DREAM");
    console.log("=".repeat(60));

    clearState(timestamp, word);
    return;
  }

  if (shouldClose) {
    // Transition to reflection phase instead of immediate close
    state.phase = "reflecting";
    state.morpheus.push(BEFORE_AFTER_ASK);
    saveState(timestamp, word, state);
    morpheusSays(BEFORE_AFTER_ASK);
    return;
  }

  // Generate contextual response based on phase
  let nextQ: string;
  if (state.phase === "opening") {
    nextQ = askMorpheus(metaphor, { phase: "opening" });
    state.phase = "exploring";
  } else {
    nextQ = askMorpheus(metaphor, { phase: "exploring" });
  }

  state.morpheus.push(nextQ);
  morpheusSays(nextQ);
  saveState(timestamp, word, state);
}

export function cmdStatus(timestamp: string, word: string): void {
  const state = loadState(timestamp, word);

  if (!state) {
    console.log(`No session: ${timestamp} ${word}`);
    return;
  }

  console.log(`Session: ${timestamp} ${word}`);
  console.log(`  Phase: ${state.phase}`);
  console.log(`  Turn: ${state.turn}/${state.max_turns}`);

  if (state.before_summary) {
    console.log(`  Before: ${state.before_summary.slice(0, 60)}...`);
  }

  if (state.morpheus.length > 0) {
    const last = state.morpheus[state.morpheus.length - 1];
    console.log(`  Last Morpheus: ${last.slice(0, 80)}${last.length > 80 ? "..." : ""}`);
  }

  if (state.metaphors.length > 0) {
    const lastM = state.metaphors[state.metaphors.length - 1];
    console.log(`  Last metaphor: ${lastM.slice(0, 80)}${lastM.length > 80 ? "..." : ""}`);
  }
}

export function cmdEnd(timestamp: string, word: string): void {
  const state = loadState(timestamp, word);

  if (!state) {
    console.log(`No session: ${timestamp} ${word}`);
    return;
  }

  // Show partial delta if we have a before
  if (state.before_summary) {
    console.log("\n" + "-".repeat(60));
    console.log("  PARTIAL REFLECTION (dream interrupted)");
    console.log("-".repeat(60));
    console.log(`\n  BEFORE: ${state.before_summary}\n`);
    console.log("  AFTER: (dream ended before reflection)");
    console.log("-".repeat(60));
  }

  // Show the metaphor trail
  if (state.metaphors.length > 0) {
    console.log("\n  METAPHOR TRAIL:");
    state.metaphors.forEach((m, i) => {
      console.log(`    ${i + 1}. ${m}`);
    });
  }

  console.log("\nDream interrupted. Awakening...");
  clearState(timestamp, word);
}

export function cmdList(): void {
  const sessions = findAllSessions();

  if (sessions.length === 0) {
    console.log("No active dream sessions.");
    return;
  }

  console.log(`Active sessions (${sessions.length}):\n`);

  for (const file of sessions) {
    try {
      const content = fs.readFileSync(file, "utf-8");
      const state = JSON.parse(content) as State;
      const name = path.basename(file, ".json");
      const parts = name.split("-");

      if (parts.length >= 3) {
        const ts = parts[1];
        const sessionWord = parts.slice(2).join("-");
        console.log(`  ${ts} ${sessionWord}`);
        console.log(`    Phase: ${state.phase} | Turn: ${state.turn}/${state.max_turns}`);
      }
    } catch {
      console.log(`  ${path.basename(file)} (unreadable)`);
    }
  }
}

export function cmdClean(): void {
  const sessions = findAllSessions();

  if (sessions.length === 0) {
    console.log("No session files to clean.");
    return;
  }

  console.log(`Removing ${sessions.length} session file(s)...`);

  for (const file of sessions) {
    try {
      fs.unlinkSync(file);
      console.log(`  Removed: ${path.basename(file)}`);
    } catch {
      console.log(`  Failed to remove: ${path.basename(file)}`);
    }
  }

  console.log("Done.");
}
