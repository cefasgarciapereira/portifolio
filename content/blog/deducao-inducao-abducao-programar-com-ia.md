---
title: "Mentes, Máquinas, Música e Software"
slug: deducao-inducao-abducao-programar-com-ia
date: '2026-11-12T15:15:32.000Z'
description: "Dedução, indução e abdução no livro Mentes, Máquinas e Música, de José Fornari, e o que esses modos de raciocínio dizem sobre código, testes e IA."
tags:
  - inteligência artificial
  - engenharia de software
  - testes
  - filosofia da computação
  - livros
lang: pt
translation: deduction-induction-abduction-programming-with-ai
readingTime: 8
---

![Mentes, Máquinas, Música e Software](/blog/deducao-inducao-abducao-programar-com-ia/01.webp)
*Photo by [Rahul Pandig](https://www.pexels.com/@rahulp9800/) on [Pexels](https://www.pexels.com/photo/blue-and-red-light-from-computer-1933900/)*

Ganhei de aniversário o livro *Mentes, Máquinas e Música*, de José Eduardo Fornari Novo Júnior (Editora da Unicamp, 2024). O autor dialoga neurociência, psicoacústica, filosofia e computação para explicar como a mente, tal qual um sistema mecânico, percebe o mundo, antecipando acontecimentos e gerando emoções, e como a música aproveita desse mecanismo para provocar emoções e reações no ouvinte.

## A Mente Como Máquina

A tese central do livro é que a mente não registra a realidade como ela é. Ela funciona como um sistema utilitário e preditivo: filtra os estímulos relevantes, compara-os com a memória e constrói modelos para antecipar o que vem depois. Quando acerta a previsão, sentimos algo positivo. Quando erra, sentimos desconforto ou até surpresa. Para Fornari, a música é o som organizado que explora exatamente esse mecanismo, criando expectativas que depois confirma ou quebra.

Para sustentar essa ideia, o autor passa pelo teorema de Bayes: a mente estaria o tempo todo atualizando probabilidades à medida que surgem novas evidências. Ele organiza o raciocínio humano em três modos, que vêm da lógica:

- **Dedução**: aplica um modelo geral já aceito a um caso específico. É determinística e não gera informação nova.
- **Indução**: testa modelos observando regularidades. É probabilística e gera conhecimento novo, mas nunca dá certeza. Aqui o autor cita Popper e a falseabilidade.
- **Abdução**: gera hipóteses novas, seja como "inferência da melhor explicação", seja como insight ou intuição. Está presente nas descobertas científicas e nas rupturas artísticas.

O termo "abdução" vem de Charles S. Peirce, que também aparece no livro, no capítulo sobre a mente social. É a parte do raciocínio que inventa: diante de um fato estranho, propõe uma explicação que, se fosse verdadeira, tornaria o fato esperado.

O exemplo que o livro usa é o de um detetive. Ele encontra pegadas de lama e uma janela aberta e formula a explicação mais simples para o crime (abdução). Depois testa essa explicação com novas pistas (indução). Por fim, aplica o que sabe sobre o suspeito para chegar a uma conclusão (dedução).

Quem já depurou um bug em produção reconhece esse roteiro.

## Dedução, Indução e Abdução

Fornari leva essa classificação para os modelos formais, matemáticos e computacionais. Ele propõe três categorias, cada uma ligada a um modo de raciocínio:

| Raciocínio | Tipo de modelo | O que faz | Exemplo do livro |
|---|---|---|---|
| Dedução | Determinístico | Aplica conhecimento existente | Teorema de Pitágoras |
| Indução | Estatístico | Testa e gera conhecimento provável | Teorema de Bayes, previsão do tempo |
| Abdução | Adaptativo | Gera soluções novas ajustando-se aos dados | Redes neurais, deep learning |

Lendo como alguém que trabalha com tecnologia, essa tabela me remeteu ao processo que passamos como programadores.

### Modelos Determinísticos

O autor sustenta que os modelos determinísticos supõem completude e são exatos apenas em um plano ideal: o teorema de Pitágoras só vale perfeitamente num plano abstrato. Ele também observa que muitas vezes usamos esses modelos por confiança, como dogmas, sem saber demonstrá-los. Por exemplo a fórmula de juros compostos, que aplicamos sem precisar provar.

É assim que trabalhamos com boa parte do software. Chamamos uma função de ordenação da biblioteca padrão, confiamos no compilador, aceitamos o veredito do type checker. Nem sempre revisamos a prova de corretude de nenhum deles, e ainda bem: é essa confiança que permite construir módulos maiores. Uma função pura é o caso mais limpo de modelo determinístico, porque para as mesmas entradas devolve sempre o mesmo resultado.

A ressalva sobre o "plano ideal" também vale aqui. A função é exata dentro do modelo dela. O sistema em volta (rede, disco, relógio, usuários) não é. Muito do trabalho do engenheiro está em saber onde termina o plano ideal.

### Testes e Indução

Para Fornari, o conhecimento obtido por indução costuma ser provisório: por mais que um modelo seja confirmado, uma nova evidência pode refutá-lo. Por isso, diz ele, a indução se apoia na "suspeita", e não na certeza.

Uma suíte de testes é exatamente isso. Cada teste é uma observação: para esta entrada, o sistema se comportou como esperado. Mil testes verdes aumentam a confiança, mas não provam que o código está correto. Significam apenas que o modelo ainda não foi falseado. Edsger Dijkstra disse algo parecido em *Notes on Structured Programming*: testar um programa pode mostrar a presença de bugs, mas nunca a sua ausência.

Ver testes como indução muda um pouco a nossa postura. Um teste que falha não é um incômodo, é a evidência mais informativa que você pode receber. E um teste que nunca poderia falhar não testa nada: um modelo que nenhuma evidência consegue refutar não diz nada, e esse é justamente o critério de Popper.

### Assistentes de IA e Modelos Adaptativos

A terceira categoria é a dos modelos cuja estrutura se ajusta aos dados: algoritmos evolutivos, redes neurais artificiais e, no fim da linha, o deep learning, capaz de processar linguagem, gerar imagens e compor música. Os modelos de linguagem que hoje completam funções, escrevem testes e sugerem refatorações estão nessa família.

O que o autor diz sobre eles me parece preciso. Assim como a abdução, esses modelos entregam soluções muitas vezes brilhantes, mas impossíveis de compreender, porque o conhecimento está distribuído em imensas matrizes de parâmetros. O exemplo do livro é o das recomendações em aplicativos de streaming: acertam o gosto do usuário, mas nem os desenvolvedores sabem explicar por que cada música foi sugerida.

Com código gerado por IA acontece o mesmo. O modelo propõe uma solução que muitas vezes funciona, mas não há uma cadeia de raciocínio que conseguimos auditar passo a passo para entender *por que* ele chegou àquilo. Temos o resultado, não a demonstração.

## Medo da Máquina

Fornari passa pelas vitórias do Deep Blue, do Deep Fritz e do AlphaGo e pelo medo recorrente de sermos substituídos, que ele compara ao ludismo do século XIX. O autor sugere que as máquinas são extensões humanas e podem nos superar na dedução e na indução, como já nos superaram em força e percepção. A abdução, porém, o raciocínio criativo ligado à imaginação, seria exclusivamente humana. Para ele, a criatividade que parece existir nos algoritmos de IA foi produzida, na verdade, pela mente de seus programadores.

Esta é uma posição intensamente debatida no campo da inteligência artificial, que tendo a conconrdar com o autor, mas o que me interessa é que, o modelo dos três raciocínios nos dá um critério prático para trabalhar com essas ferramentas.

## O Ciclo do Detetive Aplicado ao Código

Voltando ao detetive. A abdução produz uma hipótese plausível, mas plausível não quer dizer verdadeira. A hipótese só vira conhecimento depois de passar pela indução e pela dedução.

Uma sugestão de um assistente de IA tem a forma de uma hipótese abdutiva: "dado o que você me mostrou, esta parece a melhor solução". Pode ser excelente. Pode ser uma explicação elegante para um problema que não é o seu. Em qualquer caso, ela entra no fluxo como hipótese, e o trabalho de engenharia é fechar o ciclo:

1. **Abdução**: a hipótese chega, do modelo ou da nossa própria intuição.
2. **Indução**: rodamos testes, observamos o comportamento, procuramos ativamente o caso que a derruba.
3. **Dedução**: confrontamos a hipótese com o que já sabemos que precisa ser verdade, como tipos, invariantes do domínio, contratos de API e regras de negócio, e revisamos o código com isso em mente.

Os modelos adaptativos são opacos. Os outros dois tipos não são. Usar as ferramentas determinísticas e estatísticas para validar o que a ferramenta adaptativa propõe é, na prática, o que separa programar *com* IA de simplesmente aceitar o que a IA escreve.

## Cuidado Com Os Modelos

Há mais um ponto do livro que vale levar para o dia a dia. Fornari observa que modelos mentais bem estabelecidos geram certeza e convicções e podem nos levar a ignorar evidências contrárias, inclusive as dos próprios sentidos. Ele insiste que todo modelo, mental, científico ou matemático, é uma representação parcial da realidade: o mapa não é o caminho.

Todo desenvolvedor tem um modelo mental do sistema em que trabalha, e é ele que nos faz produtivos. Também é ele que nos faz procurar falhas durante horas no lugar errado, porque "aquele módulo com certeza está certo". O mesmo vale para a confiança em uma ferramenta de IA: depois de algumas sugestões boas seguidas, o modelo mental "isso costuma acertar" começa a substituir a verificação.

A lição, nos dois casos, é tratar o modelo como provisório e deixar a evidência ter a última palavra.

Esse texto não é uma publi, mas já que expus sobre o livro e o recomendo, corra lá pra [adquirir uma versão](https://loja.editoraunicamp.com.br/musica/mentes-maquinas-e-musica-consideracoes-interdisciplinares-sobre-a-ciencia-a-tecnologia-e-a-arte-da-comunicacao-expressiva-musical-717/p) e promover a obra.

---

## Referências

- NOVO JUNIOR, José Eduardo Fornari. *Mentes, máquinas e música: considerações interdisciplinares sobre a ciência, a tecnologia e a arte da comunicação expressiva musical*. Campinas, SP: Editora da Unicamp, 2024. Especialmente os capítulos 6 (Passado, Presente e Futuro), 13 (Modelos Mentais), 14 (Mentes que Mentem), 28 (Modelos Determinísticos, Estatísticos e Adaptativos) e 29 (Medo da Máquina).
- DIJKSTRA, Edsger W. Notes on Structured Programming. In: DAHL, O.-J.; DIJKSTRA, E. W.; HOARE, C. A. R. *Structured Programming*. Londres: Academic Press, 1972. (Texto circulado originalmente como relatório técnico em 1970.)
