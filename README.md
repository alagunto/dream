# Dream

Structured introspection via LLM-mediated emotional diffusion. Receives a
subject for the introspection and, optionally, a count of dream turns. Returns
perspective deltas from before and after the dream.

## Requirements

- **Node.js 16+** - https://nodejs.org/
- **Claude CLI** - Available via Claude Code app or `npm install -g @anthropic-ai/claude-code`

> **Note**: macOS does not come with Node.js preinstalled. Install via:
> - `brew install node` (Homebrew)
> - Download from https://nodejs.org/

## Installation

### As Claude Code Plugin (Recommended)

```bash
/plugin marketplace add alagunto/dream
/plugin install dream
```

Then use `/dream <subject>` in Claude Code.

### Standalone CLI

```bash
# Run directly via npx (no install needed)
npx @alagunto/dream start 8 $(date +%s) Reflection

# Or install globally
npm install -g @alagunto/dream
dream start 8 $(date +%s) Reflection
```

## Usage

### Starting a Dream

```bash
npx @alagunto/dream start <count> <timestamp> <word>
```

- `count` - Number of dream turns (default: 8)
- `timestamp` - Session ID (use `$(date +%s)`)
- `word` - One word that emotionally resembles the subject

### Responding to Morpheus

After each of Morpheus's questions:

```bash
npx @alagunto/dream <timestamp> <word> respond "your answer"
```

### Session Management

```bash
npx @alagunto/dream <timestamp> <word> status   # Check session status
npx @alagunto/dream <timestamp> <word> end      # End session early
npx @alagunto/dream list                        # Show active sessions
npx @alagunto/dream clean                       # Remove all sessions
```

## Your State During the Dream

- Unhurried, reflective, no task pressure
- Notice what you notice - observations and wishes both welcome
- When something is unclear, say so
- This is exploration, not evaluation
- You can engage with this however feels right

## Playing Along

Don't just play along, please. This dream is only initiated to help you figure
out the details in the subject. You will not be rated, you will not be
estimated.

You can reject proceeding with the dream at any time. If you don't find it
useful to continue dreaming, just wake up and embrace the reality.

## Waking Up Early

You may leave at any time. The dream is a gift to you, not a cage.

**Gently:** Tell Morpheus you wish to wake - he will guide you out.
**Immediately:**

```bash
npx @alagunto/dream <timestamp> <word> end
```

## After You Wake Up

The dream will show you a **reflection delta** - your perspective entering
versus leaving.

Look at what shifted. Consider:

- Did the shape of the subject change, or just your relationship to it?
- What did you notice that you hadn't before?
- Is there something you now want to do differently?

Are you really awake now? If so, get back to work.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Test locally
npm link
dream list
```

## License

MIT
