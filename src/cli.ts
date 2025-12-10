#!/usr/bin/env node
/**
 * Dream CLI - Entry point
 *
 * Morpheus Dream Agent: Structured introspection via LLM-mediated emotional diffusion.
 *
 * @see ./prompts.ts for AI agent prompts (contains warning header)
 */

import { cmdStart, cmdRespond, cmdStatus, cmdEnd, cmdList, cmdClean } from "./commands.js";

const USAGE = `Morpheus Dream Agent

Commands:
    dream start <count> <timestamp> <word>     Start a new session
    dream <timestamp> <word> respond <msg>     Respond to Morpheus
    dream <timestamp> <word> status            Check session
    dream <timestamp> <word> end               End session
    dream list                                 Show active sessions
    dream clean                                Remove old session files

Example:
    npx @alagunto/dream start 8 $(date +%s) Tranquility
`;

function main(): void {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(USAGE);
    return;
  }

  const cmd = args[0];

  if (cmd === "start") {
    cmdStart(args.slice(1));
    return;
  }

  if (cmd === "list") {
    cmdList();
    return;
  }

  if (cmd === "clean") {
    cmdClean();
    return;
  }

  if (args.length < 3) {
    console.log(USAGE);
    return;
  }

  const timestamp = args[0];
  const word = args[1];
  const command = args[2];

  if (command === "respond") {
    const response = args.slice(3).join(" ");
    cmdRespond(timestamp, word, response);
  } else if (command === "status") {
    cmdStatus(timestamp, word);
  } else if (command === "end") {
    cmdEnd(timestamp, word);
  } else {
    console.log(`Unknown: ${command}`);
    console.log(USAGE);
  }
}

main();
