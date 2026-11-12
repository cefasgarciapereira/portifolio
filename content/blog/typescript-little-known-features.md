---
title: 'Typescript: Little Known Features'
slug: typescript-little-known-features
date: '2024-06-28T01:50:56.000Z'
description: 'Enums, tuples, type guards, utility types, decorators and more: lesser-known TypeScript features that make your code safer and easier to maintain.'
tags:
  - web-development
  - full-stack
  - typescript
  - clean-code
  - software-development
lang: en
translation: typescript-recursos-pouco-conhecidos
mediumUrl: 'https://cefasgpereira.medium.com/typescript-little-known-features-3e9cc0e76b38'
---

![Typescript: Little Known Features](/blog/typescript-little-known-features/01.webp)
*Photo by [Timothy Cuenat](https://unsplash.com/@timothycuenat) on [Unsplash](https://unsplash.com/)*

TypeScript, a superset of JavaScript, offers many unique features that can enhance your development experience. While some aspects of TypeScript are widely known and used, there are several lesser-known features that can significantly improve your code’s readability, maintainability, and functionality. In this post, we’ll explore some of these hidden gems.

### Enums: Simplifying Constant Values

TypeScript supports enums, allowing you to define a set of named constants. This can make your code more readable and easier to manage.

```typescript
enum Direction {
    Up,
    Down,
    Left,
    Right
}
```

Enums provide a clear way to represent a collection of related values, making your code more intuitive.

### Tuples: Fixed Types and Lengths

TypeScript introduces tuples, which allow you to define an array with fixed types and lengths. This feature ensures that the elements of the array adhere to a specific structure.

```typescript
let tuple: [string, number];
tuple = ["hello", 10]; // Correct
```

Tuples are particularly useful when you need to represent a collection of values with different types.

### Access Modifiers: Control Access to Class Members

TypeScript supports access modifiers like public, private, and protected, which are not available in JavaScript. These modifiers help you control the visibility and accessibility of class members.

```typescript
class Animal {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
}
```

Using access modifiers, you can enforce encapsulation and protect the internal state of your objects.

### Type Guards: Determining Types at Runtime

TypeScript provides type guards to help you determine the type of a variable at runtime. Type guards are essential for writing type-safe code.

```typescript
function isString(x: any): x is string {
    return typeof x === "string";
}
```

With type guards, you can perform type checks and handle different types appropriately.

### Abstract Classes: Defining Abstract Methods

TypeScript allows you to define abstract classes and methods. Abstract classes are intended to be subclassed and not instantiated directly.

```typescript
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log("roaming the earth...");
    }
}
```

Abstract classes provide a blueprint for other classes, ensuring they implement specific methods.

### Readonly Modifier: Preventing Modifications

The readonly modifier prevents modification of properties after their initial assignment. This feature is useful for defining immutable properties.

```typescript
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {}
}
```

Using readonly, you can ensure that certain properties remain constant throughout the lifecycle of an object.

### Namespaces: Organizing Code

TypeScript allows for the creation of namespaces, which can help organize your code and prevent name collisions.

```typescript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
}
```

Namespaces are ideal for grouping related functionalities and maintaining a clean code structure.

### Utility Types: Facilitating Type Transformations

TypeScript provides several utility types to facilitate common type transformations, such as Partial, Readonly, Record, Pick, and Omit.

```typescript
interface Person {
    name: string;
    age: number;
}
const partialPerson: Partial<Person> = { name: "Alice" };
```

Utility types simplify the process of working with complex types and enhance code reusability.

### Decorators: Adding Metadata and Modifying Behavior

Though still experimental, TypeScript supports decorators, which are special kinds of declarations that can be attached to a class, method, accessor, property, or parameter.

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

Decorators enable you to add metadata and modify the behavior of your code in a declarative way.

### Literal Types: Defining Specific Values

TypeScript allows the use of literal types, which can be combined into union types. Literal types enable you to define variables that can only take specific values.

```typescript
type Direction = "up" | "down" | "left" | "right";
function move(direction: Direction) {
    console.log(direction);
}
```

Literal types enhance type safety and provide better documentation for the allowed values.

## Conclusion

These lesser-known features of TypeScript can greatly enhance your development experience, making your code more robust, maintainable, and scalable. By leveraging these features, you can take full advantage of TypeScript’s capabilities and write better JavaScript applications. Explore these hidden gems and unlock the full potential of TypeScript in your projects!

## References

1.  TypeScript Documentation. Retrieved from [https://www.typescriptlang.org/docs/handbook/](https://www.typescriptlang.org/docs/handbook/enums.html.)
