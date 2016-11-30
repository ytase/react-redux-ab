# Integration with Google Analytics

A classic thing you want to have with A/B testing is to measure the results with [Google Analytics](https://analytics.google.com/).

As all your experiments and their values are in the store, it is indeed pretty easy to set a dimension based on all their values. 

## Session based experiments

Session based experiments are perfect if you don't need to support several values of the variant for an experiment for a specific user, it will store the whole chain of experiments and their values in a GA dimension that you can filter to get your custom metrics. **If your user can switch or reset a variant, or if you want to do it for him, this is not a valid method as you will always get only the last value without any visibility on the previous ones.**

You will first need to create a session dimension in the Google Analytics administration, and set its value dynamically by listening to the store.

A simple integration will therefore look like this:

```javascript
// Create the store with the experiments in it
const store = createStore(rootReducer, initialState)

function updateGAExperiment () {
	let previousExperiments = currentExperiments
	currentExperiments = store.getState().experiments

	// If the experiments have been changed, time to update the session value
	if (previousExperiments != currentExperiments) {
		let dimValue = ''
		for (let experiment in currentExperiments) {
			// Create your dimension as you wish
			// here we create it as a comma separated list of experiment:variant
			if (dimValue.length > 0) {
				dimValue += ','
			}
			dimValue += experiment + ':' + currentExperiments[experiment]
		}

		// Set your GA value here
		ga('set', 'dimensionXX', dimValue)
	}
}

store.subscribe(() => {
	saveFavorites(store.getState().favorites)
})
```

## Feeding a middleware

If your use case needs more granular access to the experiments and their variant (for instance if you plan to change them accross a given session), the session dimension is not a solution. In that case, you need to set up a ** hit** dimension, and feed every hit with the right information. The easiest solution is then to use a Redux middleware to send the GA event and automatically get the current experiment values when the event is sent.