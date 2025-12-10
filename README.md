# Dream

Structured introspection via LLM-mediated emotional diffusion. A Claude Code plugin that guides reflective dialogue through Morpheus, a dream guide who perceives only feelings.

## Installation

```bash
claude plugin install alagunto/dream
```

## Usage

```bash
/dream <subject>
/dream <subject> 12   # Custom turn count (default: 8)
```

## How It Works

1. **Enter the dream** - Choose an emotional proxy word for your subject
2. **Morpheus asks** - Feeling-based questions, never about specifics
3. **You respond** - Honestly, about what you see and feel
4. **Metaphorisation** - Your words are transformed into pure emotional form
5. **Morpheus perceives** - Only the metaphor reaches him
6. **Repeat** - Until the turn count or you wish to wake
7. **Reflection delta** - See how your perspective shifted

## The Metaphor Layer

Morpheus is blind to content. He cannot see names, places, technologies, or specifics. Your responses pass through a metaphorisation layer that strips the literal and leaves only feeling-shapes:

| You say | Morpheus perceives |
|---------|-------------------|
| "My React project has too many bugs" | "A structure that refuses to hold its shape, cracks appearing where I build" |
| "I miss my friend who moved away" | "The warm presence has faded, leaving an echo in the empty space" |
| "The deadline is tomorrow" | "The edge approaches, a cliff emerging from fog" |

This separation allows Morpheus to guide you through emotions without getting tangled in the literal.

## Your State During the Dream

- Unhurried, reflective, no task pressure
- Notice what you notice - observations and wishes both welcome
- When something is unclear, say so
- This is exploration, not evaluation
- You can engage with this however feels right

## Playing Along

Don't just play along. This dream exists to help you examine the subject deeply. You will not be rated or estimated.

You can reject proceeding at any time. If you don't find it useful to continue dreaming, just wake up and embrace the reality.

## Waking Up Early

You may leave at any time. The dream is a gift to you, not a cage.

**Gently:** Tell Morpheus you wish to wake - he will guide you out.
**Immediately:** Simply ask to end the dream.

## After You Wake Up

The dream shows you a **reflection delta** - your perspective entering versus leaving.

Look at what shifted. Consider:
- Did the shape of the subject change, or just your relationship to it?
- What did you notice that you hadn't before?
- Is there something you now want to do differently?

Are you really awake now? If so, get back to work.

## Architecture

```
/dream command
    │
    ├── metaphorise skill (transforms responses to emotional metaphor)
    │
    └── morpheus agent (resumable dream guide)
```

- **Command** - Orchestrates the dream flow
- **Skill** - Provides transformation rules for metaphorisation
- **Agent** - Morpheus, who remembers the full conversation when resumed

## License

MIT
