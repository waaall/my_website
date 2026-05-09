---
title: "Asking Why Down to Bedrock and Building a Knowledge Tree: My Way of Thinking"
date: 2026-03-02
tags: [Essays]
summary: "An understanding-oriented way of thinking: build knowledge into a tree, and chase the key questions all the way down to the mechanism layer."
---

I'm better at an understanding-oriented way of thinking: build knowledge into a tree, and chase the key questions down to the mechanism layer. It doesn't suit standardized exams, and it doesn't quite suit the old-style mode of narrow specialization in a tiny domain either, but it's very useful for learning complex systems and for picking up new fields quickly across industries. On top of that, AI has perfectly solved a big chunk of my pain points in this style, and this style of thinking also seems unusually well matched to using AI efficiently.

In one sentence: build a logical knowledge tree, and ask why all the way down. OK, if all you wanted was an AI summary, you can swipe away now [dog]

## A real example: how I wove "the computer" into a tree

When it comes to asking why down to bedrock, of course it's not a simple (or absolute) chase to the bottom, because for any question there's no final, most-correct answer. Almost every question drags along a whole series of further questions, so you have to stop somewhere appropriate — though even I don't always know exactly where the right place to stop is.

For example: during grad school, while doing molecular dynamics simulations, I started getting interested in computers. As a complete beginner, I had a ton of questions right from the start.

### If a computer only understands 0s and 1s, what do those 0s and 1s actually "look" like?

- What is a computer program? How is it stored? (Of course I knew it was binary, but how is binary actually stored on a physical disk?) This isn't really a simple computer question — I only later realized it's more of a question about semiconductor physics and materials science. But how do the technical details of semiconductor physics and materials processing turn into devices? I had to stop here. (Not because I didn't want to know, but because there were more things I wanted to know that took up my attention, so I just shelved it. I'm aware, though, that at this layer of computer understanding, I have no clue at all — so in my knowledge tree, the link between this part and semiconductor physics is essentially broken.)
- I had no real grasp of computer hardware either — what is RAM? what is cache? Of course I'd taken electrical/electronic engineering in college and remembered the general line of thought: semiconductor devices form logic gates, which form different components. If I didn't know, I'd go look it up. And yes, I knew the rough idea, but only roughly, so later I borrowed a few textbooks from the library and dug into the actual details of this process. Are these details useful for computer software? Almost not at all. But without knowing this process, it's hard for me to even start learning software — it would feel like a castle in the air (vague and floating). Even after roughly understanding the process plus a bit of detail, I'm still nowhere near being able to do, say, real digital microcircuit design — so this part of my knowledge tree is also nearly disconnected.

- After roughly understanding how computer hardware works, I went back and re-learned a few days of assembly, and I finally understood the most basic, simplest principle of how digital circuits and binary programs work together. (This kind of "understanding" is hard to put into words; it feels like synapses suddenly forming a strong connection — it just clicks, and that knowledge stops slipping completely out of my head. I can pull it back up at any time. Years later most of the details may be forgotten, but re-learning is fast. Without that "click" feeling, all those related questions and bits of knowledge are basically wasted time, and within a few years my memory system will fully delete them.)

Was thinking about all this useful? At the time it didn't seem to be. But it ended up being enormously helpful for my later embedded software work.

### How does `print("Hello World")` turn into the 0s and 1s inside the CPU?

- So my first question when getting ready to learn software was: how does the code I write — C or Python — turn into the assembly/machine instructions I just barely got my head around? That's the territory of compilers/interpreters. If someone asks this, the typical Baidu answer is: GCC's workflow — compile, assemble, link… For me, that's nowhere near enough. What is "compiling"? How does the process actually go? What algorithms are used to "interpret" such simple syntax into machine instructions? What is linking? Why can it find those library functions? So I downloaded an ebook of *Compiler Principles* and tried to read it — way too hard (for me at that stage), and I shelved it. I still got the general gist of the process, so this part only formed a weak link.

Was thinking about this useful? It didn't seem useful at the time, and honestly even now it doesn't seem all that useful — I occasionally pay attention to how the Python interpreter works, but there's no need to expect everything to be useful. It being fun is plenty.

### Why does the computer know what I want when I just click the mouse?

- Even after shelving so many questions and getting a barely-passable picture from code → machine instructions → digital circuits, the moment I tried to actually learn computer software (like installing Python), the questions came back: wait, what is an operating system? Why can I install software just by clicking with a mouse? (This belongs to the territory of GUI rendering, etc. Of course I went through the same process again — until I got temporarily put off by some step, or got drawn away by a more interesting question, and shelved it. This part only really came back up later when gaming pulled me in: rendering pipelines, display parameters and what they mean, display technologies, and so on. Even then, I only got a basic sense of it, no deep dive.)
- At this point I still hadn't started installing the software I wanted to learn, and another question hit: wait, that's just the UI display. The OS kernel is what coordinates everything. What is the kernel? Where is it? No other software directly controls the OS? Then how do they call the hardware? How do they load data? Game over… I learned for nothing… You always get these moments where you think you've broken through to clear skies, only to have it turn into thick fog. The operating system is a really hard bone to chew on, but if I don't understand it, I genuinely have no idea how the software I'm "operating" actually gets loaded and run, layer by layer! I had to grit my teeth and look through several OS books, but I got beaten back — too much content, and the more content there was, the more questions there were! In the end I just had to start learning while still half-confused. (I didn't really pick up OS stuff properly until after grad school, and it took several months of dedicated study.)

Was this useful? At the time it didn't seem so, but it's been hugely helpful for my system-level co-debugging now, because I have a (relatively) clear sense of the call relationships of the code I write and the actual hardware-level execution path. Which problems might come from cache inconsistency? Which from hardware compatibility issues? Which from inter-process communication? Of course, beyond knowing the OS and the hardware, this also depends a lot on logic, on a controlled-experiment mindset, and so on. That said, just figuring out these questions in the first place was already plenty interesting on its own.

### What on earth are all these messy configurations and command-line tools doing?

- When I was installing software, using the command line, configuring environment variables — the questions came again and again and again! Hold on, the OS book never mentioned any of this stuff! Aren't all these command-line tools part of the OS? Why doesn't the OS book talk about them? So I started looking it up: why? And then I finally got it — outside the OS kernel there's a huge body of tools, drivers, system software, etc. — even larger in code volume than the kernel itself. A lot of their underlying principles are shared, like those command-line tools. They're often just manipulating files, configuring networks, and so on. Of course, it was only several months later that I really got it: in most cases, configuring networks (and many other things) is also just manipulating files. At the time I rewrote a forum post to summarize this.
- At that point, I could finally start learning C and Python! There were of course plenty of questions during that learning too — like downloads being slow, which got my head full of questions about computer networks, which sent me off researching networking for a long while: all the protocols, how they relate, their data frames, what the transmission process looks like, all sorts of things. So by the time I could barely write a line of code and didn't really understand basic syntax, a full year had already passed since I first wanted to learn software.
- And I'm skipping a lot of questions here. Like learning to type — I got curious about how a keyboard works, watched some teardown videos and read a few popular intros online, and let it slide. It wasn't until much later that I finally found the bandwidth to take a few keyboards apart.

Was this useful? At the time it didn't seem so. But in this stage I unified scattered command-line tools and configuration headaches into one category: most of them are operating on files and on system state. Once I figured out the implementation mechanism for some of them and successfully grouped them, I became extremely comfortable with any new tool I ran into later. This has helped me enormously with current server setup and all kinds of programming environment configuration.

## On building a logical knowledge tree

About building a logical knowledge tree — the example above already implies a lot about this part. There are two core abilities involved:

1. Logical ability: breaking a question down into testable hypotheses, untangling the causal chain, and being clear about what is a condition, what is an assumption, what is an inference, and whether the reasoning process has secretly introduced new conditions, assumptions, or theorems.
2. Self-awareness: for the world as a whole, or for any specific question, knowing which parts you know and which parts you don't, which you understand fairly well, which you understand only weakly, and which you don't understand at all. Without this ability, the so-called knowledge tree is largely fake. Of course, no one can fully objectively assess their own level of understanding, but the gap between people in how accurately they can locate themselves on this map is still very obvious.

As for how to improve your logical ability and self-awareness? That's another complicated question entirely. I've written a few related posts before, but only scratched the surface, and going into it here would be off-topic (although going off-topic is something I can hardly avoid).

## How to use AI to play to your strengths and shore up your weaknesses

### How AI rescues a wild curiosity

For me, the biggest value of AI isn't that it thinks for me — in fact, the thinking part is irreplaceable. Turning information into understandable knowledge requires a person to do the thinking. A good prompt/question is, in essence, describing to the AI which "missing nodes" and "acceptance boundaries" exist on your knowledge tree. Concretely, AI gives me two big functions (beyond handling certain specific tasks):

1. AI dramatically lowers the cost of acquiring cross-disciplinary knowledge.

It quickly patches up the boring parts that would otherwise have stalled my thinking, just enough to let the trunk keep "growing." Right now AI massively compresses the search process — not only can it quickly give a fairly solid brief answer, it can also conveniently surface high-quality related papers and books. Before this, for the more obscure niche fields, I'd often get put off by the tedium of searching and just waste my time.

2. Helping unstick my thinking.

For general but complex understanding problems, for vivid explanations of jargon, for concepts that look conflicting or are easy to confuse, etc., AI can efficiently help work through them.

How do you use AI better? In a sentence: ask the questions worth asking. Questions are the one thing I'm never short of — a never-ending pile of them. Of course, just like all "one-line pieces of advice," "famous quotes," or "F = ma," that single sentence by itself is useless. The real value lies in the information hidden behind it, and for this topic, that's exactly the AI prompting I'm about to talk about.

### AI prompts

This way of thinking, first of all, has a clear logical chain, and second, has clear boundaries (i.e. what I do and don't know). I find that this style is also very well suited to AI prompt "engineering."

For AI prompts, three things are very important:

1. Crystal-clear about the requirements: which parts must be done, which are optional, which can be improvised freely.
2. Make an effort to extract the known conditions: which don't need to be mentioned (e.g. "translate into Chinese" — I don't need to explain what Chinese is), and which do.
3. Specify the expected output range. If you want it to be more general, with more ideas, you should make it explicit in the prompt that the existing data/information is not the only thing being expressed, and you can give various examples to help it abstract from different inputs to the essential thing you want; if you want it to be more specialized and precise, then state clearly how accurate the existing data is, and give examples of the kinds of cases you do *not* want handled, so it understands the scope and the level of precision you're after.

But on the process of *writing* a prompt, I think there are a few more interesting points:

1. You have to be able to step into a particular perspective: it knows nothing about your needs or any of the relevant context. But it has a vast store of general knowledge and a strong ability to understand — and "understanding" is not psychic ability. It does not know what you're thinking. Then, if you had a colleague/classmate like that (and ideally imagine it as a robot, because while it looks smart, it's also quite "rigid" — much of the time it won't, like a human would, automatically filter out content that obviously doesn't fit the scenario, and that ends up affecting it; so context management is also very important — I may go into that in the future), how would you get them to help you? Express it that way.
2. You can try having a conversation with the AI to refine the above (requirements, conditions, output range), then start a new conversation to produce the final prompt. Of course, as model capability, information processing, and need-understanding evolve, this will become less important. Current models have already started actively asking about uncertain parts of a question (I'm not sure whether that's the system prompt's doing, or whether OpenAI/Anthropic have already internalized this behavior into the model itself).

Honestly, understanding the architecture and design process of the model itself also helps a lot in using it better, especially the basics of the ML framework and the model's context. But for most people who don't have such strong curiosity, time, or energy, that's probably asking too much. But! The more you understand the design details of frontier AIs like OpenAI and Claude, the more you feel like the so-called intelligence of the human brain has fewer and fewer unique advantages. Both exhilarating and terrifying. (Off-topic again.)

## Summary

At the end of the day, my thinking habit is to keep generating questions and keep hanging them on a knowledge tree. AI compresses the cost of patching all those "weak links" to almost nothing, letting me reach an actionable level of understanding much faster.

And this fairly strong logical thinking and curiosity in turn lets me use AI better — so a lot of "off-task" exploration and curiosity quickly turn into my advantage. If this way of thinking can broaden your horizons, or just nudge your curiosity a bit — for instance: why are badminton shuttlecocks made from duck and goose feathers, and down jackets stuffed with duck and goose down? Humans eat enormous numbers of chickens — wouldn't it be nice to put all that wasted chicken feather to use? Or could it be that "feathers all over the floor" (一地鸡毛) is exactly because chicken feathers aren't very useful?

Just ask the AI! It pushes the cost of boring search and information gathering down to almost nothing, letting a "logic freak" like me wander into all sorts of fields with curiosity in tow. In the past, this kind of "going off-task" might have been called being distracted, but in the AI era, it's called "rapid cross-disciplinary modeling."

Finally, here's a joke every LLM prompt engineer will get:

- That's a really sharp question,
- This step you raised is absolutely critical,
- Conclusion first,
- Let me start with one key judgment,
- I'll just give you the conclusion straight up,
- Just to anchor you,
- Here's a directly actionable judgment, no detours,
- No detours, no comforting fluff,
- Conclusion first, then the path,
- No need to keep agonizing over this!
- This is the final, optimized version you've been looking for!
- F---, the user has fully lost it.
