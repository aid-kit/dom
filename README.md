# Aid Kit - DOM

[![npm version](https://badge.fury.io/js/@aid-kit%2Fdom.svg)](https://badge.fury.io/js/@aid-kit%2Fdom)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`@aid-kit/dom` is a lightweight library for DOM manipulation, inspired by **jQuery**. It provides easy-to-use methods for selecting elements, modifying styles, handling events, and more.

## Features

- **Element Selection:** Easily select elements using CSS selectors.
- **Style Manipulation:** Change CSS styles of selected elements.
- **Event Handling:** Attach event listeners to elements.
- **Show/Hide Elements:** Quickly show or hide elements.
- **HTML Manipulation:** Get or set the HTML content of elements.

## Installation

You can install the package via **npm**:

```bash
npm install @aid-kit/dom
```

## Usage

```javascript
import $ from "@aid-kit/dom"

$(documend).ready(() => {
  $(".next").on("click", () => {
    const currentImg = $(".active")
    const nextImg = currentImg.next()

    if (nextImg.length) {
      currentImg.removeClass("active").css("z-index", "-10")
      nextImg.addClass("active").css("z-index", "10")
    }
  })

  $(".prev").on("click", () => {
    const currentImg = $(".active")
    const prevImg = currentImg.prev()

    if (prevImg.length) {
      currentImg.removeClass("active").css("z-index", "-10")
      prevImg.addClass("active").css("z-index", "10")
    }
  })
})

$.get("https://jsonplaceholder.typicode.com/photos").done(console.log).fail(console.error)
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request. Here are some ways you can contribute:

- **Bug Reports:** If you find any bugs or unexpected behavior, please open an issue describing the problem.
- **Feature Requests:** If you have ideas for new features or improvements, feel free to suggest them by opening an issue.
- **Code Contributions:** Contributions to the codebase via pull requests are highly appreciated. Before submitting a pull request, please make sure to follow the contribution guidelines below.

### Contribution Guidelines

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your feature/fix: `git checkout -b feature-name`.
3. Make changes and test them thoroughly.
4. Ensure that your code follows the existing code style and conventions.
5. Update the README and documentation if necessary.
6. Commit your changes with descriptive commit messages.
7. Push your branch to your fork: `git push origin feature-name`.
8. Open a pull request to the `main` branch of the original repository.

Thank you for contributing to `@aid-kit/dom`!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
