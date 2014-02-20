# Annalisa

Simple analyzer. Given an string, produces associated data.

## Usage

## Installation

Via npm on Node:

```
npm install annalisa
```

## Usage

Reference in your program:

```js
var anna = require('annalisa');
```

## Example

After configuring the analyzer with rules
```js
var result = anna.analize('Ford model T');
// { type: 'car', company: 'Ford Motors', model: 'T' }
```

Another example
```js
var result = anna.analize('Peanut butter 800gr.');
// { category: 'Butter', flavor: 'Peanut', weight: 800, unit: 'gr' }
```