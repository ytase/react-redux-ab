export function setExperimentVariant(experiment, variant) {
	return {
		type: 'SET_EXPERIMENT_VARIANT',
		experiment,
		variant
	}
}

export function loadExperimentVariants(state) {
	return {
		type: 'LOAD_EXPERIMENTS_VARIANTS',
		state
	}
}