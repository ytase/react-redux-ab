# react-redux-ab
======

react-redux-ab is a simple A/B testing that stores the active variants in a reducer for easy access accross the whole application. It is universal, as it can run on the client side, browser side or any kind of application where redux can run.

[API docs](docs/API.md)

Compared to prior libraries, it offers the following advantages:
- The availability in the store by default makes it possible to have one experiment with effects in several places in the application, even widely separated.
- Ability to A/B test not only visual elements but also anything that has access to the store. You can for instance A/B test async action creators for speed tests.
- Weighted variants out of the box. You can create an experiment with 4 variants but decide that one will be used by 60% of the traffic, one by 20% and the remaining two by 10% each.

## Basic client side use case
------

1. Create experiments and add them to the root reducer:

```javascript
import { combineReducers } from 'redux'
import { createExperiments } from 'react-redux-ab'

const rootReducer = combineReducers({
	/* Your stuff here */
	experiments: createExperiments({
		'buttons': {
			variants: [
				{name: 'blue'},
				{name: 'red', weight: 5}
			]
		},
		'callToAction': {
			variants: [
				{name: 'original'},
				{name: 'suggestion1'},
				{name: 'suggestion2'}
			]
		}
	})
})
```

2. Load them from the cookies at laod time (use any cookie library you want, we love [js-cookie](https://github.com/js-cookie/js-cookie):

```javascript
import { createStore } from 'redux'
import { digestCookies } from 'react-redux-ab'
import Cookies from 'js-cookie'
import rootReducer from './reducer'

const initalState = {
	experiments: digestCookies(Cookies.get())
}
const store = createStore(rootReducer, initialState)
```

3. Connect the cookie updater to the store:

```javascript
import { backeCookies } from 'react-redux-ab'
import Cookies from 'js-cookie'
store.subscribe(() => {
	bakeCookies(store.getState(), Cookies.set)
})
```


4. Use experiments in your components:

```jsx
import React from 'react'
import { Experiment, Variant } from 'react-redux-ab'

export default function MyApp (props) {
	return <Experiment name="callToAction">
			<Variant name="original">
				<button>Boring button</button>
			</Variant>
			<Variant name="suggestion2">
				<a href="#">Awesome link</a>
			</Variant>
		</Experiment>
}
```

## Recipes
- (Use react-redux-ab on the server side)[]

Check out more details on parameters and possibilities in the [API docs](docs/API.md)