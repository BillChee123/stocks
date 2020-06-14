# Javascript Guide

## Scope

References:

- https://dev.to/sandy8111112004/javascript-introduction-to-scope-function-scope-block-scope-d11#:~:text=Block%20Scope,only%20within%20the%20corresponding%20block

### Definition

Scope determines the visibility or accessibility of a variable or other resource in the area of your code.

### Global Scope

There's only one Global scope in the JavaScript document. The area outside all the functions is consider the global scope and the variables defined inside the global scope can be accessed and altered in any other scopes.

### Block Scope: Area in curly braces `{}`

A block scope is the area within if, switch conditions or for and while loops. Generally speaking, whenever you see {curly brackets}, it is a block. In ES6, const and let keywords allow developers to declare variables in the block scope, which means those variables exist only within the corresponding block.

### Function Scope

Whenever you declare a variable in a function, the variable is visible only within the function. You can't access it outside the function. var is the keyword to define variable for a function-scope accessibility.

### Local Scope

Variables declared inside the functions become Local to the function and are considered in the corresponding local scope. Every Functions has its own scope. Same variable can be used in different functions because they are bound to the respective functions and are not mutual visible.
