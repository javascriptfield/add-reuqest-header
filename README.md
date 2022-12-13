# Getting Started

## Installation

``` bash
npm i add-request-header

```

## Example

``` bash
# in your main.js, condition is optional
import {addRequestHeader, nanoid} from "add-request-header"
addRequestHeader([{key: 'some header', value: nanoid(), condition: true}])
```

## License

[MIT](https://github.com/javascriptfield/add-reuqest-header/blob/main/LICENSE)
