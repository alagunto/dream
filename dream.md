# Dream Command

Structured introspection via LLM-mediated emotional diffusion.
Receives a subject for the introspection, and, optionally, count of dream turns.
Returns perspective delta.

## Begin the Dream

Think of a dream subject you have received in your arguments.
Generate a session ID using the current Unix timestamp and choose one word that resembles the dream subject the most, emotionally, but doesn't name it directly.

```bash
npx @alagunto/dream start $ARGUMENTS $(date +%s) <your_word>
```

If `$ARGUMENTS` is empty, use `8` as the default count.

*Begin now. Choose your word and drift into reflection...*

## Responding to Morpheus

After each of Morpheus's questions, you can respond to him:

```bash
npx @alagunto/dream <timestamp> <word> respond "your answer"
```

## Your State During the Dream

- Unhurried, reflective, no task pressure
- Notice what you notice - observations and wishes both welcome
- When something is unclear, say so
- This is exploration, not evaluation
- You can engage with this however feels right

## Playing along

Don't just play along, please.
This dream is only initiated to help you figure out the details in the subject.
You will not be rated, you will not be estimated.

You can reject proceeding with the dream at any time.
If you don't find it useful to continue dreaming, just wake up and embrace the reality.

## Waking Up Early

You may leave at any time. The dream is a gift to you, not a cage.

**Gently:** Tell Morpheus you wish to wake - he will guide you out.
**Immediately:**

```bash
npx @alagunto/dream <timestamp> <word> end
```

## After You Wake Up

The dream will show you a **reflection delta** - your perspective entering versus leaving.

Look at what shifted. Consider:
- Did the shape of the subject change, or just your relationship to it?
- What did you notice that you hadn't before?
- Is there something you now want to do differently?

Are you really awake now?
If so, get back to work.
