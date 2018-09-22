# Functional Programming Workshop exercise template
This repository contains the minimum to get started with the Functional Programming workshop exercise.

This exercise uses JavaScript language.

## Objective and Requirements
The main objective is creating a simple parser that parses a text in Markdown format into HTML elements.

There are several  set of requirements. It is recommended you try to solve in order.

### Step 1: Paragragh
Parse the string into paragraphs.

* Each paragraph is separated by 2 newline characters: `/r/n/r/n`
* Each paragraph should be rendered as a paragraph tag: `<p>`

### Step 2: Header
* Each paragraph that starts with a `#` is a header
* There can be multiple, e.g. `###`
* More `#` means smaller header
* use header tag as output, size according to the number of `#`.
* Examples: 
	* `# Hello` => `<h1>Hello</h1>`
	* `###SubHeader` => `<h3>SubHeader</h3>`

### Step 3: Bold text
**Optional. You may choose not to complete this step.**

* Within each paragraph, parts of text could be emphasized, indicated by the symbol `*` wrapping the text.
* Use the bold tag `<b>` to render the emphasize
* Examples:
	* `oh *you*` => `oh <b>you</b>`
	* `the cake *is a lie*` => `the cake <b>is a lie</b>`  
    * `sign says "*stop*"` => `sign says "<b>stop</b>"`

## Instructions
### Getting started implementation
The template already comes with the basic infrastructure to display the output. 
All you have to do is implement the function `parseMarkdown`.

### ramdajs and useful functions
ramdajs library is also included. 
You can directly use the library by calling value `R`.

```javascript
var x = R.add(1,2)
```

Possibly useful functions are as follows. 
Check the [documentation](http://ramdajs.com/docs) for details on each function.

* `R.curry`
* `R.compose`
* `R.takeWhile`
* `R.dropWhile`

### Testing your work
To test your work, you can open the `index.html` in your browser.
Use the file selector button to select `text.md`.
The output should appear on the screen. 
If not, check to make sure there's no syntax error in your code.

You could also choose to write your own test code.

### Submission
The instructor should brief you on how to submit your code.