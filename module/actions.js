export function setExperimentVariant(experiment, variant) {
	return {
		type: 'SET_EXPERIMENT_VARIANT',
		experiment,
		variant
	}
}