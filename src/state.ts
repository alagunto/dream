/**
 * State management for dream sessions.
 * Uses atomic file operations for concurrent session safety.
 */

import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import type { State } from "./types.js";

export function getSessionDir(): string {
  const envDir = process.env.CLAUDE_DREAMS_DIR;
  const candidates: string[] = [];

  if (envDir) {
    candidates.push(envDir.startsWith("~") ? envDir.replace("~", os.homedir()) : envDir);
  }

  candidates.push(
    path.join(os.homedir(), ".claude", "dreams"),
    path.join(os.homedir(), ".claude-dreams"),
    "/tmp/dreams"
  );

  for (const base of candidates) {
    try {
      fs.mkdirSync(base, { recursive: true });
      if (fs.statSync(base).isDirectory()) {
        return base;
      }
    } catch {
      continue;
    }
  }

  throw new Error("Could not create dream session directory in any candidate path.");
}

export function getStateFile(timestamp: string, word: string): string {
  return path.join(getSessionDir(), `.dream-${timestamp}-${word}.json`);
}

export function findAllSessions(): string[] {
  const dir = getSessionDir();
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.startsWith(".dream-") && f.endsWith(".json"))
      .map((f) => path.join(dir, f));
  } catch {
    return [];
  }
}

export function loadState(timestamp: string, word: string): State | null {
  const file = getStateFile(timestamp, word);
  try {
    const content = fs.readFileSync(file, "utf-8");
    return JSON.parse(content) as State;
  } catch {
    return null;
  }
}

/**
 * Save state atomically using write-to-temp-then-rename pattern.
 * This ensures concurrent sessions don't corrupt each other's state.
 */
export function saveState(timestamp: string, word: string, state: State): void {
  const file = getStateFile(timestamp, word);
  const temp = `${file}.tmp.${process.pid}`;
  fs.writeFileSync(temp, JSON.stringify(state, null, 2), "utf-8");
  fs.renameSync(temp, file); // Atomic on POSIX
}

export function clearState(timestamp: string, word: string): void {
  const file = getStateFile(timestamp, word);
  try {
    fs.unlinkSync(file);
  } catch {
    // File may not exist, that's ok
  }
}
