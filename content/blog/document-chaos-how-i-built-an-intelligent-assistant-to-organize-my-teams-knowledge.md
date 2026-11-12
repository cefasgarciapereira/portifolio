---
title: >-
  Document Chaos: How I Built an Intelligent Assistant to Organize My Team’s
  Knowledge
slug: >-
  document-chaos-how-i-built-an-intelligent-assistant-to-organize-my-teams-knowledge
date: '2023-10-26T03:50:38.000Z'
description: 'How I built an assistant that answers questions from my team''s documents using TF-IDF, cosine similarity and a language model, with Python code.'
tags:
  - nlp
  - chatbots
  - python
  - information-retrieval
lang: en
translation: caos-de-documentos-como-criei-um-assistente-inteligente-para-organizar-o-conhecimento-do-meu-time
mediumUrl: >-
  https://python.plainenglish.io/document-chaos-how-i-built-an-intelligent-assistant-to-organize-my-teams-knowledge-bbfb184f55df
---

![Document Chaos: How I Built an Intelligent Assistant to Organize My Team’s Knowledge](/blog/document-chaos-how-i-built-an-intelligent-assistant-to-organize-my-teams-knowledge/01.webp)
*Photo by [Beatriz Pérez Moya](https://unsplash.com/@beatriz_perez) on [Unsplash](https://unsplash.com/)*

Ultimately, at my job, we face a problem that I bet many of you also face, whether at work or in any other activity. You know that moment when you decide to write down all the steps of an operation, details of several subjects, manuals, scripts and at the end of the day, you have a pile of documents and information that ends up getting lost in the clutter?

Well, we were on that same boat. We have always had the habit of writing down everything about what we do and discover: bugs, development issues, issues with the client, domain documents, architecture and so on. The idea was to share the company’s day-to-day knowledge among colleagues, especially because, from time to time, a person who knows more about a certain subject is absent.

The proposal was too good! And it really is… but with the growth of the project and the team, we often didn’t find the information we needed. The standard search tools, like the Windows bar, or “search” in the Google Drive, good old ctrl + f, were no longer sufficient. At that time, I just wanted a “GPT Chat” that had all the knowledge that we built at the company.

At first, it seemed a bit far away, but I started looking into how to implement this. After all, nowadays there are tutorials and videos of people integrating GPT chat with everything… So, one way or another, I knew it was possible.

Then, in my saga, I reached a term that was the key to the trunk: **Document Information Recovery**! It’s funny, because I’ve always consumed NLP content, but surprisingly, I’d never come across this concept. But as they say, there’s a first time for everything, and that was the experience I want to share with you.

The idea, as I said, was to use a collection of documents that people generated at the company as a basis for the system to give us answers. I developed an MVP, and there’s still a lot to improve, because like any other system, it’s difficult to predict where it will end.

## Architecture

After some research and testing, I reached an architecture that did the job. One concern was informing where the system got the answer from, after all, we are talking about a company. GPT chat itself doesn’t always get it right, so knowing that my system would eventually answer me wrong, I wanted to be able to work around the situation. Another idea was to filter the information for the model to generate the answers. When using the entire base at once, the model began to invent things and mix concepts. Then, the decision was to use cosine similarity to find the document that most semantically resembles the subject I put in the prompt.

> **Cosine similarity** is a metric that measures the closeness between two vectors in a multidimensional space. It is widely used in natural language processing tasks, such as information retrieval and text analysis. In short, it searches all of our documents for the one that has the closest content to what was asked in the prompt.

I’ll tell you, that alone helped a lot! It may seem simple, but just by informally writing what I want and the system finding a relevant document, it was worth the effort. The coolest thing here is that the search using cosine similarity is not a simple search for word coincidence, but for the meaning of the sentence. So you don’t have to worry about the terms you’re using, of course if the words match it helps, but it’s not mandatory, you can simply type what you need in whatever way comes to your mind and voilá. For all the tests I did, the result was satisfactory. A dose of serotonin to continue the journey.

The last step was to use this document returned by cosine similarity to feed the Chatbot model and formulate the responses.

## Code

So, we’ve already understood the idea and the flow of the system. Now, let’s see how the code turned out.

### Initial Search

The first step is to look for the document that will serve as the basis for the answer. It was important in our case, because I could simply throw all the information into the model to generate a response, but then it gave it room to mix things up. This initial filter was key to increasing the usefulness of the model’s response. Furthermore, this way we know where the chatbot got the information from, avoiding that “black box”.

```python
def get_context(question):
    vectorizer = TfidfVectorizer(preprocessor=preprocess_text)
    tfidf_matrix = vectorizer.fit_transform(documents)
    question_tfidf = vectorizer.transform([question])

    similarities = cosine_similarity(question_tfidf, tfidf_matrix)

    document_index = similarities.argmax()

    return documents[document_index]
```

### Chatbot

For the chatbot, I used the [LangChain](https://www.langchain.com/) library and the [Llama 2](https://huggingface.co/docs/transformers/main/model_doc/llama2) model. LangChain is a framework for developing applications based on language models. Llama 2 is a series of generative text models that have been trained and tuned, and do great dialogue. Llama-2-Chat models show superior performance to open source chat models in several benchmarks. In human evaluations, considering usefulness and security, they are on par with some renowned closed source models such as ChatGPT and PaLM.

So, we passed the document returned by the previous search to the Llama 2 model, through the LangChain infrastructure, and created a prompt for the chatbot, asking it to act as a professional assistant, without inventing answers and responding in a clear and objective way.

```python
def get_answer(context, question):
  template =  """
    Use the following context to answer the question at the end.
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    {context}
    Question: {question}
    Helpful Answer:
  """
  prompt = PromptTemplate.from_template(template)
  llm_chain = LLMChain(prompt=prompt, llm=llm)
  response = llm_chain.run({"context": context, "question": question})
```

## Conclusion

And that’s it. As simple as that!

I had a little more work to develop a front-end and improve the chat experience. And as I said before, there are still things that can be done, such as feeding back the conversation, connecting it to the internet or other sources of knowledge. But for the initial objective, it has been a success for us, and we are satisfied with the result. It has even helped us improve our own documentation to optimize the system’s responses. Another improvement to make is to integrate better with our documentation. I developed a preprocessor that converts HTML and PDF pages in .txt, but I’m thinking about improving this flow and making the integration of our documentation with the system more transparent.

I hope it helped, brought a little knowledge and terms that can help you with your goals. If you want more details about the implementation or concepts, just ask here, send an email, and here is the [**source code**](https://github.com/cefasgarciapereira/chat-information-retrieval) of my project.

## References

1.  Introduction to Information Retrieval by Christopher D. Manning, Prabhakar Raghavan, and Hinrich Schütze.
2.  Mining of Massive Datasets by Jure Leskovec, Anand Rajaraman, and Jeffrey D. Ullman.
3.  Information Retrieval: Implementing and Evaluating Search Engines by Stefan Büttcher, Charles L. A. Clarke, and Gordon V. Cormack.
4.  Modern Information Retrieval by Ricardo Baeza-Yates and Berthier Ribeiro-Neto.
5.  Introduction to Information Retrieval by Christopher D. Manning, Prabhakar Raghavan, and Hinrich Schütze.
6.  Natural Language Processing in Action by Lane, Howard, and Hapke.
7.  Chatbot Design and Development: A Comprehensive Guide by Sagar Nangare.
