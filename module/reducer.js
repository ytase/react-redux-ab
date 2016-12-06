export function chooseRandomly (variants) {
	const weighedVariants = []
	variants.forEach(variant => {
		const weight = variant.weight || 1
		for (let i=0; i < weight; i++) {
			weighedVariants.push(variant)
		}
	})
	return weighedVariants[Math.floor(Math.random() * weighedVariants.length)].name
}

function getRandomVariant(experiment) {
	const choose = experiment.choose || chooseRandomly
	return choose(experiment.variants)
}

export function createExperiments (experiments) {
	function generateRandomState() {
		const initialState = {}
		for (let name in experiments) {
			initialState[name] = getRandomVariant(experiments[name])
		}
		return initialState
	}
	return function reducer (state = generateRandomState(), action) {
		switch (action.type) {
			case 'RESET_EXPERIMENT_VARIANT':
				return Object.assign({}, state, {[action.experiment]: getRandomVariant(experiments[action.experiment])})

			case 'LOAD_EXPERIMENTS_VARIANTS':
				return Object.assign({}, state, action.state)

			case 'SET_EXPERIMENT_VARIANT':
				return Object.assign({}, state, {[action.experiment]: action.variant})

			default:
				return state
		}
	}
}