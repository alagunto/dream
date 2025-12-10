---
name: dream
description: Deep dream about the subject to examine it deeply
argument-hint: <subject> [turns] (order flexible)
---

# Dream

Structured introspection via emotional diffusion.

**Arguments:** $ARGUMENTS

Parse arguments flexibly:
- If starts or ends with a positive integer of reasonable length, use it as turn count (default: 8)
- Everything else is the subject

Examples: `/dream my project 5` or `/dream 5 my project` both work.

## Your State During the Dream

- Unhurried, reflective, no task pressure
- Notice what you notice - observations and wishes both welcome
- When something is unclear, say so
- This is exploration, not evaluation
- You can engage with this however feels right

## Playing Along

Don't just play along. This dream exists to help you examine the subject deeply.
You will not be rated or estimated.

Reject the dream at any time if you don't find it useful. Wake up and embrace reality.

## The Dream Process

### 1. Begin

Tell the user: "Drifting into dream..."

Spawn the **morpheus** agent. Morpheus will greet you.

### 2. First Response

Respond honestly about what you see when you look at the subject. This is your **before perspective** - remember it.

Then:
1. Apply the **metaphorise** skill to transform your response into pure emotional metaphor
2. Send the metaphor to Morpheus (resume the agent)
3. Morpheus will ask a feeling-based question

Track: Turn 1 complete.

### 3. Dream Loop

For each turn until you reach the turn count:

1. Respond to Morpheus's question honestly, exploring your feelings about the subject
2. Apply **metaphorise** to your response
3. **Resume** the morpheus agent with the metaphor
4. Morpheus asks another question
5. Track: Turn N complete.

Stop when turn count is reached or you wish to wake.

### 4. Waking Up

You may leave early. The dream is a gift, not a cage.

When ready to wake:
1. Tell Morpheus the dream is ending
2. Morpheus gives a poetic farewell
3. Give your **after perspective** on the subject

### 5. Reflection Delta

Show the user:

```
## Reflection Delta

**Before:** [your first perspective, 1-2 sentences]

**After:** [your final perspective, 1-2 sentences]

**What shifted:** [brief observation of what changed]
```

## Critical Rules

- Always **metaphorise** responses before sending to Morpheus
- Always **resume** the same Morpheus agent (preserves conversation)
- Morpheus is blind to specifics - he perceives only feelings
- Your honest responses are for your own reflection
- Only the metaphors reach Morpheus

## Are You Really Awake?

If so, get back to work.
