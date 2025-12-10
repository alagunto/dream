# Dream Plugin for Claude Code

Provides the `/dream` command to guide reflective sessions with Morpheus.

## Requirements

- **Node.js 16+** - Required for the CLI backend
  - macOS: `brew install node` or https://nodejs.org/
  - Linux: `apt install nodejs npm` or `dnf install nodejs`
  - Windows: https://nodejs.org/

## Installation

```bash
/plugin marketplace add alagunto/dream
/plugin install dream
```

## Usage

```bash
/dream <subject>
/dream 12 <subject>   # Custom turn count
```

The plugin will:
1. Check that Node.js/npx is available
2. Start a dream session via `npx @alagunto/dream`
3. Guide you through reflective dialogue with Morpheus
4. Show perspective delta when you wake

## How It Works

The `/dream` command invokes a TypeScript CLI via npx that:
- Transforms your responses into emotional metaphors
- Guides dialogue through Morpheus (an AI dream guide)
- Tracks session state in `~/.claude/dreams/`
- Shows how your perspective shifted

## Troubleshooting

If you see "NPX_NOT_FOUND":
1. Install Node.js from https://nodejs.org/
2. Restart your terminal
3. Try `/dream` again
