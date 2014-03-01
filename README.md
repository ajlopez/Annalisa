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

## Versions

- 0.0.1 Published
- 0.0.2 Published. Using simplied words in search. Analyze recognize numbers with point or comma as decimal point.
- 0.0.3 Published. z to s, q to k in simplify, more preciosa use cases

## License

MIT

## Contribution

Feel free to [file issues](https://github.com/ajlopez/Annalisa) and submit
[pull requests](https://github.com/ajlopez/Annalisa/pulls) — contributions are
welcome<

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

