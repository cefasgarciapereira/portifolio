---
title: Benefits Of Semantic HTML That You Can’t Miss
slug: benefits-of-semantic-html-that-you-cant-miss
date: '2023-04-10T12:40:59.625Z'
description: 'What semantic HTML is and why it matters for accessibility, SEO and maintainability, with good and bad markup examples using header, main and article.'
tags:
  - html
  - front-end-development
  - web-development
  - ux
lang: en
translation: beneficios-do-html-semantico-que-voce-nao-pode-ignorar
mediumUrl: >-
  https://medium.com/@cefasgpereira/benefits-of-semantic-html-that-you-cant-miss-49f2e16554a7
---

![Benefits Of Semantic HTML That You Can’t Miss](/blog/benefits-of-semantic-html-that-you-cant-miss/01.webp)
*Photo by [Valery Sysoev](https://unsplash.com/@valerysysoev) on [Unsplash](https://unsplash.com)*

HTML (HyperText Markup Language) is the foundation of the web. It’s the language used to create the structure and content of web pages. Semantic HTML is an important aspect of creating a website that is not only visually appealing but also accessible and understandable to everyone. In this post, we’ll explore what semantic HTML is and why it’s essential for web development.

Semantic HTML refers to the practice of using HTML elements that convey meaning and purpose to both humans and machines. These elements provide information about the content of a web page, making it easier for search engines, screen readers, and other assistive technologies to understand the content.

One of the key benefits of using semantic HTML is improved accessibility. Accessibility means creating web content that can be accessed by people with disabilities. By using semantic HTML elements, web developers can provide additional context to assistive technologies, which can then provide a better user experience for people with disabilities.

Semantic HTML can also improve the SEO (Search Engine Optimization) of a website. Search engines rely on the content of a web page to determine its relevance and rank it in search results. By using semantic HTML elements, web developers can provide additional information to search engines about the content of a web page, which can improve its ranking.

Let’s take a look at some examples of semantic HTML elements.

1.  **`<header>` —** The `<header>` element is used to define a header section for a web page. This element usually contains the site logo, navigation menu, and other important information related to the web page.
2.  **`<main>` —** The `<main>` element is used to define the main content of a web page. This element usually contains the primary content of the page, such as articles, blog posts, or product listings.
3.  **`<article>` —** The `<article>` element is used to define an independent, self-contained piece of content on a web page. This element is typically used for blog posts, news articles, or other similar content.
4.  **`<section>` —** The `<section>` element is used to define a section of a web page. This element is typically used to group related content, such as a group of articles, products, or services.
5.  **`<footer>` —** The `<footer>` element is used to define a footer section for a web page. This element usually contains copyright information, social media links, and other important information related to the web page.

Semantic HTML not only makes a web page accessible to people with disabilities but also improves its usability for everyone. For instance, by using semantic HTML elements like `<nav>` for navigation links, web developers can make it easier for users to understand and navigate the site. Similarly, by using `<h1>` to `<h6>` for headings, web developers can help users quickly scan and understand the content on the page.

Another advantage of semantic HTML is that it can make a website more maintainable and future-proof. By using descriptive and meaningful element names, it becomes easier to update and modify the code in the future. For instance, if you use `<section>` to group related content, it becomes easier to make changes to that section in the future without having to modify the entire page.

Semantic HTML also plays an important role in responsive web design. With the increasing use of mobile devices, web developers need to create web pages that adapt to different screen sizes. Semantic HTML can help in this process by providing the necessary structure and hierarchy to the content. By using **`<header>`**, **`<main>`**, and **`<footer>`** elements, web developers can create a flexible layout that works across different devices.

There are some common mistakes that web developers make when it comes to semantic HTML. For example, using `<div>` instead of semantic elements or using semantic elements incorrectly. This can lead to a poorly structured page, which can be difficult to understand and navigate. Therefore, it is essential to use semantic HTML correctly to ensure that the website is accessible, usable, and future-proof.

To illustrate what was discussed, take a look at the examples below:

### Good Example

```html
<header>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <header>
      <h1>Why Semantic HTML is Important</h1>
      <p>Published on March 23, 2022</p>
    </header>
    <p>Semantic HTML plays a crucial role in web development...</p>
  </article>
  <section>
    <h2>Our Services</h2>
    <ul>
      <li>Web Design</li>
      <li>Web Development</li>
      <li>SEO</li>
    </ul>
  </section>
</main>
<footer>
  <p>&copy; 2022 MyCompany. All rights reserved.</p>
</footer>
```

In this example, semantic HTML elements like `<header>`, `<nav>`, `<article>`, `<section>`, and `<footer>` are used to structure the content of the web page. This makes the page more accessible, improves SEO, and makes it easier to maintain.

### Bad Example

```html
<div class="nav">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</div>
<div class="content">
  <div class="blog-post">
    <div class="blog-header">
      <h1>Why Semantic HTML is Important</h1>
      <p>Published on March 23, 2022</p>
    </div>
    <div class="blog-content">
      <p>Semantic HTML plays a crucial role in web development...</p>
    </div>
  </div>
  <div class="services">
    <h2>Our Services</h2>
    <ul>
      <li>Web Design</li>
      <li>Web Development</li>
      <li>SEO</li>
    </ul>
  </div>
</div>
<div class="footer">
  <p>&copy; 2022 MyCompany. All rights reserved.</p>
</div>
```

In this example, non-semantic elements like `<div>` are used instead of semantic HTML elements like `<header>`, `<nav>`, `<article>`, `<section>`, and `<footer>`. This makes the page harder to understand for search engines, screen readers, and other assistive technologies. It also makes it harder to maintain and update the code in the future.

---

To summarize, semantic HTML is an essential aspect of web development that improves accessibility, usability, maintainability, and future-proofing of a website. By using semantic HTML elements correctly, web developers can create a website that is easy to navigate, adapt to different screen sizes, and is accessible to everyone. Therefore, it is important to learn and use semantic HTML correctly to create a better web experience for everyone.

---

## References

1.  MDN Web Docs: HTML Semantic Elements: [https://developer.mozilla.org/en-US/docs/Glossary/Semantics#html\_semantic\_elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#html_semantic_elements)
2.  W3Schools: HTML Semantics: [https://www.w3schools.com/html/html5\_semantic\_elements.asp](https://www.w3schools.com/html/html5_semantic_elements.asp)
3.  A List Apart: The Importance of Semantics: [https://alistapart.com/article/the-importance-of-semantic-markup/](https://alistapart.com/article/the-importance-of-semantic-markup/)
4.  HTML5 Doctor: HTML5 Semantics: [https://html5doctor.com/html-5-semantics/](https://html5doctor.com/html-5-semantics/)
5.  WebAIM: Semantic Structure: [https://webaim.org/techniques/semanticstructure/](https://webaim.org/techniques/semanticstructure/)
6.  CSS-Tricks: Semantic HTML: [https://css-tricks.com/semantic-html/](https://css-tricks.com/semantic-html/)
