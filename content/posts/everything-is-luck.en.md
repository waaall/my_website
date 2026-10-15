---
title: Everything Is Luck
date: 2026-10-15
tags: [Miscellany]
summary: Tracing the formation of choices and effort from unchosen initial conditions, and examining why every action ultimately depends on luck as it applies to the individual.
draft: false
---

## What Is Luck?

I have long had a question: how much comes down to luck? To begin with, the following two categories count as luck:

- Conditions the individual did not choose: birth, family, and early influences. We can ask further: how early counts as early? How do we identify the individual's first choice, as distinct from something produced by the environment and random events?
- Random events outside the individual's control: a chance encounter, for example. Randomness does not imply that probabilities cannot be predicted; when rolling a die, for example, we can predict the probability of each outcome, but this does not give us control over the result.

These two categories need not be mutually exclusive, but “unchosen” and “random” have different meanings. Even if a condition is entirely deterministic, as long as I did not choose it—my circumstances at birth, for example—it still counts as luck for me in the sense used here. Accordingly, “luck” in this essay includes initial conditions the individual did not choose, external encounters the individual did not autonomously determine, and random factors outside the individual's control. The central issue in the argument is whether I ultimately chose the conditions that shaped me, regardless of whether the world is random.

Advantages arising from one's circumstances at birth and innate characteristics can ordinarily be classified as luck for the individual. Explaining their origins through biological processes or natural laws does not turn these advantages into achievements of the individual's own choices or effort. Starting from these conditions, this essay traces the formation of later choices and effort. **Extending the conclusion to all behavior does not require expanding the definition of “luck.”**

**The claim this essay seeks to establish is that every action a person takes ultimately depends entirely on luck as it applies to that person.** The discussion concerns the dependence of behavior on its sources; it does not require classifying the behavior itself as luck. “Depends entirely on” includes the random factors that actually participate in the process. It does not require the future to be uniquely predictable from the initial state alone.

Two senses of “randomness” are also distinguished here. In one, there are too many variables or too little information for us to predict the outcome. In the other, different outcomes can occur even when the complete prior state and the laws are identical. The argument below accommodates both cases: in the former, we can still trace the conditions that produced the outcome; in the latter, the particular outcome is likewise outside the individual's control and therefore counts as luck in the sense used here.

## My Questions and Reasoning

Many people say talent matters; some say no, effort matters; others say no, choices matter. Of course, some also say luck matters.

But I wonder: doesn't all of this depend on luck? When a child is born, for example, do their genes, family background, region, and country count as luck? Do their choices constitute agency? Do their choices matter? Suppose they choose to raise a hand for the first time: the left hand or the right hand, and by how many degrees? Should this be called a random event, a choice, or effort? Compared with their genes, family background, region, and country, what proportion does each contribute to determining their future life?

The advantages conferred by talent can be attributed to luck. If an infant's states and actions all arise from conditions they did not choose, at what point do the choices and effort that emerge later acquire a source independent of those conditions? At age six? Five? Twelve?

Why, then, would that particular choice or effort acquire a source independent of its prior formative conditions simply by being called “agency”? Starting from the fertilized egg, prior states evolve under natural laws and are affected by external conditions and possible random factors. Calling a later step a choice or an effort still requires an explanation of how that step arose.

## The Argument

### 1. Mathematical Notation

First consider the case in which internal states and behavior are represented discretely. Vectors represent internal states, external conditions, and behavior:

| Symbol            | Meaning                                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| $t$               | Time index                                                                                                                                                                                                    |
| $\mathbf S_t$     | The internal state vector at time $t$, including information retained within the individual from past experiences that affects current behavior, such as memories, knowledge, skills, habits, and motivations |
| $\mathbf E_t$     | The vector of relevant external conditions at time $t$, including external effects of past events that persist into the present, such as supportive relationships, resources, and opportunities               |
| $\mathbf A_t$     | The random vector representing behavior at time $t$, including choices and effort                                                                                                                             |
| $\mathbf a$       | A particular possible value of the behavior vector                                                                                                                                                            |
| $p_t$             | The conditional probability mass function for behavior at time $t$                                                                                                                                            |
| $\mathbf S_{t+1}$ | The random vector representing the internal state at the next time step                                                                                                                                       |
| $\mathbf s'$      | A particular possible value of the internal state at the next time step; the prime does not denote differentiation                                                                                            |
| $q_t$             | The conditional probability mass function for the internal state transition from time $t$ to $t+1$                                                                                                            |

Here, $\mathbf S_t$ and $\mathbf E_t$ are stipulated to jointly contain all historical information relevant to generating current behavior. Historical influences are assigned to the internal state or external conditions according to where they currently reside; no separate history variable is introduced. For example, confidence and skills resulting from early encouragement are included in $\mathbf S_t$, while supportive relationships that continue into the present are included in $\mathbf E_t$.

### 2. Behavior Function

Given the internal state and external conditions, the probability that behavior takes the value $\mathbf a$ is written as:

$$
\boxed{
\Pr(\mathbf A_t=\mathbf a\mid\mathbf S_t,\mathbf E_t)
=p_t(\mathbf a\mid\mathbf S_t,\mathbf E_t)
}
$$

Here, $\mid$ means “given these conditions”; the subscript $t$ in $p_t$ denotes time, not multiplication. For each given combination of state and conditions, the probabilities of all possible actions are nonnegative and sum to $1$.

This representation also accommodates deterministic behavior: if a particular action $\mathbf a^\ast$ has conditional probability $1$ and all other actions have conditional probability $0$, the result is a degenerate distribution with all probability concentrated on a single outcome. Thus, using a probabilistic representation does not require every step to be nondeterministic.

### 3. Behavioral Dynamics

After an action occurs, the conditional probability that the internal state at the next time step takes the value $\mathbf s'$ is written as:

$$
\boxed{
\Pr(\mathbf S_{t+1}=\mathbf s'\mid\mathbf S_t,\mathbf A_t,\mathbf E_t)
=q_t(\mathbf s'\mid\mathbf S_t,\mathbf A_t,\mathbf E_t)
}
$$

The current action $\mathbf A_t$ is explicitly included as a conditioning variable to express that the state update depends on the individual's action as well as the current internal state and external conditions. For example, practice affects skills, memory, and physical condition at the next time step.

Consistent with the representation of behavior generation, the current state, action, and external conditions are required to contain all historical information relevant to generating the next state. For each given combination of conditions, the probabilities of all possible next states are nonnegative and sum to $1$. If a particular next state has conditional probability $1$, this includes the case of a deterministic update.

Together, behavior generation and state updating express the following process: the current state contributes to generating behavior, and behavior in turn contributes to shaping the next state; that next state, together with the external conditions at the next time step, contributes to generating subsequent behavior.

### 4. Summary

Taking the initial conditions and the step-by-step generation process together, a person's behavior at any moment ultimately depends entirely on luck as it applies to that person. What we call choices and effort are also included in this formative process. The question, then, is this: if all of a person's choices and effort depend on luck as it applies to them, aren't these so-called choices and efforts all just self-consolation?

## Explanation of the Argument

### 1. I Did Not Choose My Initial Self

A person cannot choose their genes, the era in which they are born, their family, or their initial upbringing. Nor can they first select a personality, desires, and powers of judgment and then begin life.

From the fertilized egg to the birth of an infant, the initial state and developmental conditions are unchosen by the individual, and the natural laws governing development were not established by that individual either. Even if these processes have definite biological explanations, the innate advantages they produce cannot be credited as achievements of the individual's own choices or effort.

Therefore, before any action that could be called “the individual's own choice” occurs, the body, abilities, and accumulated experiences that produce that choice already have formative sources that can be traced back to luck as it applies to the individual.

### 2. Later Choices Cannot Serve as an Independent Starting Point Either

**A person's choice or effort at this moment is jointly generated by the complete set of their prior internal state and surrounding conditions, together with any random processes that may participate. Even if the prior state and the laws are exactly the same, random processes may produce different outcomes.**

This requires no additional assumption that randomness is absent. **Even if such random processes exist, their particular outcomes remain outside the individual's control and therefore still count as luck under the definition given earlier.**

Proceed step by step from the initial state: under natural laws, the prior state, together with the relevant external conditions and any participating random factors, generates the state and action at the next moment; the new state then contributes to subsequent generation. The specific form of the functions, and whether their mechanisms have already been understood, do not affect this structure of tracing origins. Memories, judgment, choices, and effort that emerge later likewise require an account of their sources.

For any choice, we can ask: why did this person choose this way?

- If it was because of their personality, knowledge, desires, or judgment, continue asking how those conditions formed.
- If it was because they had previously taken the initiative to change themselves, continue asking why they wanted to change at that time and why they had the ability to do so.
- If it was because of a random factor, a random occurrence does not establish autonomous control by the individual.

“I shaped my present self through my past choices” may be true, but it cannot end the inquiry, because those past choices require the same kind of explanation. Tracing backward along this chain still leads to unchosen initial conditions, subsequent encounters, and any participating random processes. Thus, within this causal account, choice has no ultimate source independently created by the individual; adding randomness does not produce such a source either.

Accordingly, there is no moment at which choice suddenly becomes independent of its formative conditions simply because a person turns five, six, or twelve. The capacity for autonomy can develop gradually, but that development itself also has origins.

### 3. Examining the Sources of “Effort” Through a Parallel-Universe Experiment

Suppose a person receives encouragement early in life, gradually learns to plan and practice, and eventually masters a skill. We branch off two worlds one second before the encouragement: in one world, the person receives it; in the other, they do not.

If the person would not have learned the skill without the encouragement, then this unchosen encouragement was a necessary condition along that path to success.

If the person would still have learned the skill without it, that does not establish independence from luck either. They might have practiced because of interest, imitation, support from others, or the need to earn a living. We can continue asking about the sources of those motivations and abilities, including genes, experiences, and earlier choices.

This experiment does not claim that “removing one instance of encouragement necessarily causes failure,” or that a finite number of experiments can establish a conclusion about everyone's every success. What it illustrates is this: **finding an alternative path to success does not establish an ultimate starting point created by the individual.** The general conclusion comes from the causal tracing in the preceding section; this experiment provides a concrete illustration of that process.

### 4. Effort Being a Cause Does Not Establish Its Independence from Luck

A common objection is: “But the person really did practice; without practice, they could not have mastered the skill. So it cannot all be attributed to luck.”

This objection answers “How was the skill acquired?” but leaves unanswered “Why did this person become willing and able to practice?” Both can hold at once: practice caused the improvement in skill, while the occurrence and effects of practice depended on conditions the individual did not ultimately choose.

One such causal path can be written as:

> Unchosen conditions and encounters → Abilities, personality, and motivations → Choices and effort → Outcomes

In practice, new environments and encounters continually influence the process, and choices also change the environment in turn. Such feedback, however, does not give the entire process a starting point created by the individual from scratch.

Thus, luck, talent, choices, and effort are not four non-overlapping contributions. Talent can be part of luck, and choices and effort can be the means through which these conditions affect outcomes. Acknowledging the causal role of effort does not refute the claim that its sources can also be traced back to luck.

### 5. What Exactly Does “100% Luck” Mean?

Here, “100%” is not a statistical measurement, nor does it mean “luck contributes 100% and effort contributes 0%.” It expresses the following: **when traced to their ultimate sources, no part remains that the individual independently created without relying on unchosen conditions.**

The argument can therefore be summarized as follows:

1. The individual's initial self and circumstances were not chosen by that individual.
2. Later choices and effort are jointly generated by the complete set of the individual's prior internal state and surrounding conditions, together with any participating random processes.
3. Earlier choices follow the same account; the inquiry cannot stop merely at “This was my choice.”
4. Even if different random outcomes can occur under identical conditions, those outcomes remain outside the individual's control and therefore still count as luck.
5. Consequently, under these premises, people are not the ultimate creators of themselves; nor does success have an ultimate source established entirely by the individual.
6. Consequently, every action a person takes, and their success, ultimately depend entirely on luck as it applies to that person. This retains the opening definition of the sources; there is no need to add “and their effects” to classify behavior and outcomes as luck.

The generative principle adopted in this argument is that the prior state, relevant external conditions, natural laws, and any participating random factors exhaust the sources that generate the state and behavior at each step. The probability formulas above represent this process; the formulas alone cannot establish the exhaustiveness of those sources. The argument requires no additional assumption that “there is no randomness” or that “people lack the capacity to choose,” nor does it presuppose its conclusion. Merely pointing out that “people do think, choose, and make an effort” cannot end the inquiry into the sources of these capacities and the processes through which they are exercised.
