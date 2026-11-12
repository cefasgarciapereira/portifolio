---
title: 'TypeScript: Recursos Pouco Conhecidos'
slug: typescript-recursos-pouco-conhecidos
date: '2024-06-28T01:50:56.000Z'
description: 'Enums, tuplas, type guards, utility types, decorators e mais: recursos pouco conhecidos do TypeScript que deixam seu código mais seguro e fácil de manter.'
tags:
  - web-development
  - full-stack
  - typescript
  - clean-code
  - software-development
lang: pt
translation: typescript-little-known-features
---

![TypeScript: Recursos Pouco Conhecidos](/blog/typescript-little-known-features/01.webp)
*Foto de [Timothy Cuenat](https://unsplash.com/@timothycuenat) no [Unsplash](https://unsplash.com/)*

O TypeScript, um superconjunto do JavaScript, oferece muitos recursos próprios que podem melhorar sua experiência de desenvolvimento. Embora alguns aspectos do TypeScript sejam amplamente conhecidos e usados, existem vários recursos menos conhecidos que podem melhorar bastante a legibilidade, a manutenibilidade e a funcionalidade do seu código. Neste post, vamos explorar algumas dessas joias escondidas.

### Enums: Simplificando Valores Constantes

O TypeScript suporta enums, que permitem definir um conjunto de constantes nomeadas. Isso pode deixar seu código mais legível e mais fácil de manter.

```typescript
enum Direction {
    Up,
    Down,
    Left,
    Right
}
```

Os enums oferecem uma forma clara de representar um conjunto de valores relacionados, deixando seu código mais intuitivo.

### Tuplas: Tipos e Tamanhos Fixos

O TypeScript traz as tuplas, que permitem definir um array com tipos e tamanho fixos. Esse recurso garante que os elementos do array sigam uma estrutura específica.

```typescript
let tuple: [string, number];
tuple = ["hello", 10]; // Correct
```

As tuplas são especialmente úteis quando você precisa representar um conjunto de valores de tipos diferentes.

### Modificadores de Acesso: Controlando o Acesso aos Membros da Classe

O TypeScript suporta modificadores de acesso como public, private e protected, que não existem no JavaScript. Esses modificadores ajudam a controlar a visibilidade e o acesso aos membros de uma classe.

```typescript
class Animal {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
}
```

Com os modificadores de acesso, você garante o encapsulamento e protege o estado interno dos seus objetos.

### Type Guards: Descobrindo Tipos em Tempo de Execução

O TypeScript oferece type guards para ajudar a descobrir o tipo de uma variável em tempo de execução. Eles são essenciais para escrever código com segurança de tipos.

```typescript
function isString(x: any): x is string {
    return typeof x === "string";
}
```

Com type guards, você consegue fazer verificações de tipo e tratar cada tipo da forma adequada.

### Classes Abstratas: Definindo Métodos Abstratos

O TypeScript permite definir classes e métodos abstratos. Classes abstratas foram feitas para serem estendidas, e não instanciadas diretamente.

```typescript
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log("roaming the earth...");
    }
}
```

As classes abstratas servem de modelo para outras classes, garantindo que elas implementem métodos específicos.

### Modificador Readonly: Impedindo Alterações

O modificador readonly impede que propriedades sejam alteradas depois da atribuição inicial. Esse recurso é útil para definir propriedades imutáveis.

```typescript
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {}
}
```

Com readonly, você garante que certas propriedades permaneçam constantes durante todo o ciclo de vida de um objeto.

### Namespaces: Organizando o Código

O TypeScript permite criar namespaces, que ajudam a organizar o código e evitar conflitos de nomes.

```typescript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
}
```

Os namespaces são ideais para agrupar funcionalidades relacionadas e manter uma estrutura de código limpa.

### Utility Types: Facilitando Transformações de Tipos

O TypeScript oferece vários utility types para facilitar transformações comuns de tipos, como Partial, Readonly, Record, Pick e Omit.

```typescript
interface Person {
    name: string;
    age: number;
}
const partialPerson: Partial<Person> = { name: "Alice" };
```

Os utility types simplificam o trabalho com tipos complexos e aumentam a reutilização de código.

### Decorators: Adicionando Metadados e Modificando Comportamentos

Embora ainda sejam experimentais, o TypeScript suporta decorators, um tipo especial de declaração que pode ser associado a uma classe, método, acessor, propriedade ou parâmetro.

```typescript
function readonly(target: any, key: string) {
    Object.defineProperty(target, key, {
        writable: false
    });
}
class Person {
    @readonly
    name: string = "John";
}
```

Os decorators permitem adicionar metadados e modificar o comportamento do seu código de forma declarativa.

### Tipos Literais: Definindo Valores Específicos

O TypeScript permite usar tipos literais, que podem ser combinados em union types. Com eles, você define variáveis que só podem assumir valores específicos.

```typescript
type Direction = "up" | "down" | "left" | "right";
function move(direction: Direction) {
    console.log(direction);
}
```

Os tipos literais aumentam a segurança de tipos e documentam melhor quais valores são permitidos.

## Conclusão

Esses recursos menos conhecidos do TypeScript podem melhorar muito sua experiência de desenvolvimento, deixando seu código mais robusto, fácil de manter e escalável. Aproveitando esses recursos, você tira o máximo das capacidades do TypeScript e escreve aplicações JavaScript melhores. Explore essas joias escondidas e libere todo o potencial do TypeScript nos seus projetos!

## Referências

1.  TypeScript Documentation. Disponível em [https://www.typescriptlang.org/docs/handbook/](https://www.typescriptlang.org/docs/handbook/enums.html.)
