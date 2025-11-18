# Actionbook best practices

Actionbooks define how your AI agent responds to users. They’re executed from top to bottom and follow a structured pattern to keep conversations predictable and effective.

Use this guide to learn how to write actionbooks that work the way you expect.

***

### Start actions with a number

Begin any agent action with a number (`1.`), followed by a command.

Use:

* `Say` to send a message
* `Ask` to collect user input
* `Call` to trigger a tool

```
1. Say: Thanks for reaching out. and ask "How can I help you today?"
```

Each number is one message bubble.\
If you want the agent to wait for input, split actions into separate steps.

***

### Use dashes for logic or structure

Use a dash (`-`) when you’re adding logic, notes, or labels that don’t trigger agent actions.

```
- If the user agrees:
  1. Say: Great. Let’s continue.
```

Dashes help organize your Actionbook without affecting flow.

***

### Actions run top to bottom

Actionbooks are executed line by line unless a step uses the [**Go to Pin**](../dashboard-guide/shared-assets/actionbooks/#writing-actionbook-instructions) feature.

Keep in mind:

* Numbered steps run in order
* Each number is one AI agent message bubble. It waits for a user input before proceeding to the next step.

#### Example

```
1. Say: Let’s get started.
2. Ask: What’s your name?
```

vs.

```
1. Say: Let’s get started. What’s your name?
```

In the second example, both messages are combined into one. Use separate steps if you want to wait for input.

***

### Handle all outcomes

Avoid logic that only covers one side of a condition.

Instead of:

```
- If the user agrees:
  1. Say: Okay, moving forward.
```

Use:

```
- If the user agrees:
  1. Say: Okay, moving forward.
  
- If the user disagrees:
  1. Say: No problem. Let me know if you need anything else.
```

Covering both outcomes keeps your conversation from breaking.

***

### Keep responses clean

Avoid repeating similar phrases across multiple steps.

```
- If a user wants to cancel their membership:
  1. Recommend pausing membership.
  2. Say: "I'm sorry you'd like to cancel. Would you like to pause your membership instead?"
```

Instead, combine or simplify the message.
