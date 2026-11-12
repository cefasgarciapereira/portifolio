---
title: "Minds, Machines, Music and Software"
slug: deduction-induction-abduction-programming-with-ai
date: '2026-11-12T15:15:32.000Z'
description: "Deduction, induction and abduction in José Fornari's book Mentes, Máquinas e Música, and what these modes of reasoning say about code, tests and AI."
tags:
  - artificial intelligence
  - software engineering
  - testing
  - philosophy of computing
  - books
lang: en
translation: deducao-inducao-abducao-programar-com-ia
---
![Mentes, Máquinas, Música e Software](/blog/deducao-inducao-abducao-programar-com-ia/01.webp)
*Photo by [Rahul Pandig](https://www.pexels.com/@rahulp9800/) on [Pexels](https://www.pexels.com/photo/blue-and-red-light-from-computer-1933900/)*

For my birthday, I got the book *Mentes, Máquinas e Música* (*Minds, Machines and Music*), by José Eduardo Fornari Novo Júnior (Editora da Unicamp, 2024). The author brings neuroscience, psychoacoustics, philosophy and computing into dialogue to explain how the mind, much like a mechanical system, perceives the world, anticipating events and generating emotions, and how music takes advantage of this mechanism to provoke emotions and reactions in the listener.

## The mind as a prediction machine

The book's central thesis is that the mind does not record reality as it is. It works as a utilitarian, predictive system: it filters the relevant stimuli, compares them with memory and builds models to anticipate what comes next. When the prediction is right, we feel something positive. When it is wrong, we feel discomfort or surprise. For Fornari, music is organized sound that exploits exactly this mechanism, creating expectations that it then confirms or breaks.

To support this idea, the author turns to Bayes' theorem: the mind would be constantly updating probabilities as new evidence comes in. He organizes human reasoning into three modes, which come from logic:

- **Deduction**: applies an already accepted general model to a specific case. It is deterministic and generates no new information.
- **Induction**: tests models by observing regularities. It is probabilistic and generates new knowledge, but never certainty. Here the author cites Popper and falsifiability.
- **Abduction**: generates new hypotheses, either as "inference to the best explanation" or as insight or intuition. It is present in scientific discoveries and artistic breakthroughs.

The term "abduction" comes from Charles S. Peirce, who also appears in the book, in the chapter on the social mind. It is the part of reasoning that invents: faced with a surprising fact, it proposes an explanation that, if true, would make the fact expected.

The example the book uses is a detective. He finds muddy footprints and an open window and comes up with the simplest explanation for the crime (abduction). Then he tests that explanation against new clues (induction). Finally, he applies what he knows about the suspect to reach a conclusion (deduction).

Anyone who has ever debugged a bug in production will recognize this script.

## Three modes of reasoning, three families of models

Fornari carries this classification over to formal, mathematical and computational models. He proposes three categories, each tied to a mode of reasoning:

| Reasoning | Type of model | What it does | Example from the book |
|---|---|---|---|
| Deduction | Deterministic | Applies existing knowledge | Pythagorean theorem |
| Induction | Statistical | Tests and generates probable knowledge | Bayes' theorem, weather forecasting |
| Abduction | Adaptive | Generates new solutions by adjusting to the data | Neural networks, deep learning |

Reading it as someone who works in tech, this table reminded me of the process we go through as programmers.

### Deterministic code: useful dogmas

The author says deterministic models assume completeness and are exact only on an ideal plane: the Pythagorean theorem only holds perfectly on an abstract plane. He also notes that we often use these models out of trust, like dogmas, without knowing how to prove them. Take the compound interest formula, which we apply without needing to prove it.

That is how we work with a good part of software. We call the standard library's sort function, trust the compiler, accept the type checker's verdict. We rarely review the proof of correctness of any of them, and thankfully so: it is this trust that lets us build larger modules. A pure function is the cleanest case of a deterministic model, because for the same inputs it always returns the same result.

The caveat about the "ideal plane" applies here too. The function is exact within its own model. The system around it (network, disk, clock, users) is not. Much of an engineer's job is knowing where the ideal plane ends.

### Tests are induction

For Fornari, knowledge obtained by induction is always provisional: no matter how many times a model is confirmed, a new piece of evidence can refute it. That is why, he says, induction rests on "suspicion" rather than certainty.

A test suite is exactly that. Each test is an observation: for this input, the system behaved as expected. A thousand green tests increase confidence, but they don't prove the code is correct. They only mean the model hasn't been falsified yet. Edsger Dijkstra put it this way in *Notes on Structured Programming*: "Program testing can be used to show the presence of bugs, but never to show their absence!"

Seeing tests as induction changes our attitude a little. A failing test is not a nuisance; it is the most informative evidence you can get. And a test that could never fail tests nothing: a model that no evidence can refute says nothing, which is precisely Popper's criterion.

### AI assistants are adaptive models

The third category is models whose structure adjusts to the data: evolutionary algorithms, artificial neural networks and, at the end of the line, deep learning, capable of processing language, generating images and composing music. The language models that today complete functions, write tests and suggest refactorings belong to this family.

What the author says about them strikes me as accurate. Like abduction, these models deliver solutions that are often brilliant but impossible to understand, because the knowledge is spread across immense parameter matrices. The book's example is recommendations in streaming apps: they get the user's taste right, but not even the developers can explain why each song was suggested.

The same happens with AI-generated code. The model proposes a solution that often works, but there is no chain of reasoning we can audit step by step to understand *why* it got there. We have the result, not the proof.

## Fear of the Machine

Fornari goes through the victories of Deep Blue, Deep Fritz and AlphaGo and the recurring fear of being replaced, which he compares to nineteenth-century Luddism. The author suggests that machines are human extensions and can surpass us at deduction and induction, just as they have already surpassed us in strength and perception. Abduction, however, the creative reasoning tied to imagination, would be exclusively human. For him, the creativity that seems to exist in AI algorithms was actually produced by the minds of their programmers.

This is a hotly debated position in the field of artificial intelligence, and I tend to agree with the author, but what interests me is that the three-reasoning model gives us a practical criterion for working with these tools.

## The detective's cycle applied to code

Back to the detective. Abduction produces a plausible hypothesis, but plausible doesn't mean true. The hypothesis only becomes knowledge after going through induction and deduction.

A suggestion from an AI assistant has the shape of an abductive hypothesis: "given what you showed me, this looks like the best solution." It may be excellent. It may be an elegant explanation for a problem that isn't yours. Either way, it enters the workflow as a hypothesis, and the engineering work is to close the cycle:

1. **Abduction**: the hypothesis arrives, from the model or from our own intuition.
2. **Induction**: we run tests, observe the behavior and actively look for the case that breaks it.
3. **Deduction**: we check the hypothesis against what we already know must be true, such as types, domain invariants, API contracts and business rules, and review the code with that in mind.

Adaptive models are opaque. The other two types are not. Using deterministic and statistical tools to validate what the adaptive tool proposes is, in practice, what separates programming *with* AI from simply accepting whatever the AI writes.

## A word of caution about our own models

There is one more point from the book worth taking into everyday work. Fornari observes that well-established mental models generate certainty and convictions and can lead us to ignore contrary evidence, including that of our own senses. He insists that every model, whether mental, scientific or mathematical, is a partial representation of reality: the map is not the territory.

Every developer has a mental model of the system they work on, and it is what makes us productive. It is also what makes us look for bugs for hours in the wrong place, because "that module is definitely right." The same goes for trusting an AI tool: after a few good suggestions in a row, the mental model "this usually gets it right" starts to replace verification.

The lesson, in both cases, is the same one the book draws from science: treat the model as provisional and let the evidence have the last word.

This isn't a sponsored post, but since I've written about the book and recommended it, go [get yourself a copy](https://loja.editoraunicamp.com.br/musica/mentes-maquinas-e-musica-consideracoes-interdisciplinares-sobre-a-ciencia-a-tecnologia-e-a-arte-da-comunicacao-expressiva-musical-717/p) and spread the word about this great book.

---

## References

- NOVO JUNIOR, José Eduardo Fornari. *Mentes, máquinas e música: considerações interdisciplinares sobre a ciência, a tecnologia e a arte da comunicação expressiva musical*. Campinas, SP: Editora da Unicamp, 2024. Especially chapters 6 (Passado, Presente e Futuro — Past, Present and Future), 13 (Modelos Mentais — Mental Models), 14 (Mentes que Mentem — Minds That Lie), 28 (Modelos Determinísticos, Estatísticos e Adaptativos — Deterministic, Statistical and Adaptive Models) and 29 (Medo da Máquina — Fear of the Machine).
- DIJKSTRA, Edsger W. Notes on Structured Programming. In: DAHL, O.-J.; DIJKSTRA, E. W.; HOARE, C. A. R. *Structured Programming*. London: Academic Press, 1972. (Originally circulated as a technical report in 1970.)
