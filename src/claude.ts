/**
 * Claude CLI integration.
 * Handles subprocess calls to the claude CLI for LLM operations.
 */

import { execaSync } from "execa";
import {
  METAPHOR_PROMPT,
  MORPHEUS_SYSTEM,
  OPENING_PROBE,
  CLOSING_PROMPT,
  PERSPECTIVE_PROMPT,
} from "./prompts.js";
import type { MorpheusOpts } from "./types.js";

export function runClaude(prompt: string): string {
  try {
    const result = execaSync("claude", ["-p", prompt], {
      timeout: 30000,
      reject: false,
    });

    if (result.exitCode !== 0) {
      console.log(`[warning] Claude returned non-zero: ${result.stderr}`);
      return "";
    }

    return result.stdout.trim();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("ETIMEDOUT") || error.message.includes("timed out")) {
        console.log("[error] Claude request timed out");
      } else if (error.message.includes("ENOENT")) {
        console.log("[error] 'claude' CLI not found in PATH");
      } else {
        console.log(`[error] Claude call failed: ${error.message}`);
      }
    }
    return "";
  }
}

export function translateToMetaphor(response: string): string {
  const prompt = METAPHOR_PROMPT.replace("{response}", response);
  const result = runClaude(prompt);
  return result || "a shape in the mist, neither warm nor cold";
}

export function summarizePerspective(response: string): string {
  const prompt = PERSPECTIVE_PROMPT.replace("{response}", response);
  const result = runClaude(prompt);
  return result || "(could not extract perspective)";
}

export function askMorpheus(metaphor: string, opts: MorpheusOpts = {}): string {
  const { isClosing = false, emotionalJourney = "", phase = "exploring" } = opts;

  let prompt: string;

  if (isClosing) {
    prompt = CLOSING_PROMPT.replace("{emotional_journey}", emotionalJourney);
  } else if (phase === "opening") {
    prompt = OPENING_PROBE.replace("{metaphor}", metaphor);
  } else {
    prompt = MORPHEUS_SYSTEM.replace("{metaphor}", metaphor);
  }

  const result = runClaude(prompt);
  return result || "I sense something stirring... Tell me more of what you feel.";
}
