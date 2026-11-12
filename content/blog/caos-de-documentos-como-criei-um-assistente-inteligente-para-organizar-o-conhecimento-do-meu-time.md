---
title: 'Caos de Documentos: Como Criei um Assistente Inteligente para Organizar o Conhecimento do Meu Time'
slug: caos-de-documentos-como-criei-um-assistente-inteligente-para-organizar-o-conhecimento-do-meu-time
date: '2023-10-26T03:50:38.000Z'
description: 'Como criei um assistente que responde perguntas a partir dos documentos do meu time usando TF-IDF, similaridade de cosseno e o Llama 2, com código em Python.'
tags:
  - nlp
  - chatbots
  - python
  - information-retrieval
lang: pt
translation: document-chaos-how-i-built-an-intelligent-assistant-to-organize-my-teams-knowledge
---

![Caos de Documentos: Como Criei um Assistente Inteligente para Organizar o Conhecimento do Meu Time](/blog/document-chaos-how-i-built-an-intelligent-assistant-to-organize-my-teams-knowledge/01.webp)
*Foto de [Beatriz Pérez Moya](https://unsplash.com/@beatriz_perez) no [Unsplash](https://unsplash.com/)*

No meu trabalho, enfrentamos um problema que aposto que muitos de vocês também enfrentam, seja no trabalho ou em qualquer outra atividade. Sabe aquele momento em que você decide anotar todos os passos de uma operação, detalhes de vários assuntos, manuais, scripts e, no fim das contas, fica com uma pilha de documentos e informações que acaba se perdendo na bagunça?

Pois é, estávamos no mesmo barco. Sempre tivemos o hábito de anotar tudo o que fazemos e descobrimos: bugs, questões de desenvolvimento, problemas com o cliente, documentos de domínio, arquitetura e por aí vai. A ideia era compartilhar o conhecimento do dia a dia da empresa entre os colegas, principalmente porque, de vez em quando, a pessoa que mais entende de determinado assunto está ausente.

A proposta era ótima! E realmente é… mas, com o crescimento do projeto e do time, muitas vezes não encontrávamos a informação de que precisávamos. As ferramentas de busca padrão, como a barra do Windows, a “pesquisa” do Google Drive e o bom e velho ctrl + f, já não davam conta. Naquela época, eu só queria um “Chat GPT” que tivesse todo o conhecimento que construímos na empresa.

No começo parecia algo meio distante, mas comecei a pesquisar como implementar isso. Afinal, hoje em dia existem tutoriais e vídeos de gente integrando o chat GPT com tudo… Então, de um jeito ou de outro, eu sabia que era possível.

Foi então que, na minha saga, cheguei a um termo que foi a chave do baú: **Recuperação de Informação em Documentos** (*Document Information Retrieval*)! É engraçado, porque sempre consumi conteúdo de NLP, mas, para minha surpresa, nunca tinha esbarrado nesse conceito. Mas, como dizem, sempre tem uma primeira vez, e foi essa a experiência que quero compartilhar com você.

A ideia, como eu disse, era usar um conjunto de documentos produzidos pelas pessoas da empresa como base para o sistema nos dar respostas. Desenvolvi um MVP, e ainda há muito a melhorar, porque, como qualquer outro sistema, é difícil prever onde ele vai parar.

## Arquitetura

Depois de algumas pesquisas e testes, cheguei a uma arquitetura que deu conta do recado. Uma preocupação era informar de onde o sistema tirou a resposta, afinal, estamos falando de uma empresa. O próprio chat GPT nem sempre acerta, então, sabendo que meu sistema eventualmente me responderia errado, eu queria conseguir contornar a situação. Outra ideia era filtrar as informações que o modelo usaria para gerar as respostas. Quando usava a base inteira de uma vez, o modelo começava a inventar coisas e misturar conceitos. A decisão, então, foi usar a similaridade de cosseno para encontrar o documento que mais se parece semanticamente com o assunto que coloquei no prompt.

> A **similaridade de cosseno** é uma métrica que mede a proximidade entre dois vetores em um espaço multidimensional. Ela é muito usada em tarefas de processamento de linguagem natural, como recuperação de informação e análise de texto. Resumindo, ela procura, entre todos os nossos documentos, aquele cujo conteúdo é mais próximo do que foi perguntado no prompt.

Vou te contar, só isso já ajudou muito! Pode parecer simples, mas só de escrever de forma informal o que eu quero e o sistema encontrar um documento relevante, já valeu o esforço. O mais legal aqui é que a busca com similaridade de cosseno não é uma simples busca por coincidência de palavras, mas pelo significado da frase. Então você não precisa se preocupar com os termos que está usando. Claro que, se as palavras baterem, ajuda, mas não é obrigatório: você pode simplesmente digitar o que precisa do jeito que vier à cabeça e voilà. Em todos os testes que fiz, o resultado foi satisfatório. Uma dose de serotonina para continuar a jornada.

O último passo foi usar o documento retornado pela similaridade de cosseno para alimentar o modelo do chatbot e formular as respostas.

## Código

Bom, já entendemos a ideia e o fluxo do sistema. Agora vamos ver como ficou o código.

### Busca Inicial

O primeiro passo é procurar o documento que vai servir de base para a resposta. Isso foi importante no nosso caso, porque eu poderia simplesmente jogar todas as informações no modelo para gerar uma resposta, mas isso dava espaço para ele misturar as coisas. Esse filtro inicial foi fundamental para aumentar a utilidade da resposta do modelo. Além disso, assim sabemos de onde o chatbot tirou a informação, evitando aquela “caixa-preta”.

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

Para o chatbot, usei a biblioteca [LangChain](https://www.langchain.com/) e o modelo [Llama 2](https://huggingface.co/docs/transformers/main/model_doc/llama2). O LangChain é um framework para desenvolver aplicações baseadas em modelos de linguagem. O Llama 2 é uma série de modelos de geração de texto pré-treinados e ajustados, que se saem muito bem em diálogos. Os modelos Llama-2-Chat têm desempenho superior aos modelos de chat de código aberto em vários benchmarks. Em avaliações humanas, considerando utilidade e segurança, eles ficam no mesmo nível de alguns modelos fechados renomados, como o ChatGPT e o PaLM.

Então, passamos o documento retornado pela busca anterior para o modelo Llama 2, através da infraestrutura do LangChain, e criamos um prompt para o chatbot, pedindo que ele agisse como um assistente profissional, sem inventar respostas e respondendo de forma clara e objetiva.

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

## Conclusão

E é isso. Simples assim!

Tive um pouco mais de trabalho para desenvolver um front-end e melhorar a experiência do chat. E, como eu disse antes, ainda há coisas que podem ser feitas, como realimentar a conversa, conectá-la à internet ou a outras fontes de conhecimento. Mas, para o objetivo inicial, foi um sucesso para nós, e estamos satisfeitos com o resultado. Ele até nos ajudou a melhorar nossa própria documentação para otimizar as respostas do sistema. Outra melhoria a fazer é integrar melhor com a nossa documentação. Desenvolvi um pré-processador que converte páginas HTML e PDF em .txt, mas estou pensando em melhorar esse fluxo e tornar a integração da nossa documentação com o sistema mais transparente.

Espero que tenha ajudado e trazido um pouco de conhecimento e termos que possam te ajudar nos seus objetivos. Se quiser mais detalhes sobre a implementação ou os conceitos, é só me mandar um email. E aqui está o [**código-fonte**](https://github.com/cefasgarciapereira/chat-information-retrieval) do projeto.

## Referências

1.  Introduction to Information Retrieval by Christopher D. Manning, Prabhakar Raghavan, and Hinrich Schütze.
2.  Mining of Massive Datasets by Jure Leskovec, Anand Rajaraman, and Jeffrey D. Ullman.
3.  Information Retrieval: Implementing and Evaluating Search Engines by Stefan Büttcher, Charles L. A. Clarke, and Gordon V. Cormack.
4.  Modern Information Retrieval by Ricardo Baeza-Yates and Berthier Ribeiro-Neto.
5.  Introduction to Information Retrieval by Christopher D. Manning, Prabhakar Raghavan, and Hinrich Schütze.
6.  Natural Language Processing in Action by Lane, Howard, and Hapke.
7.  Chatbot Design and Development: A Comprehensive Guide by Sagar Nangare.
