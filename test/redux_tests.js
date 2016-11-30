import assert from 'assert'
import { createExperiments } from '../module/reducer'
import { setExperimentVariant } from '../module/actions'

const reducer = createExperiments([])

describe ('Experiments reducer', () => {
	it ('Should return the initial state', () => {
		assert.deepEqual(
			reducer(undefined, {}),
			{}
		)
	})

	it ('Should handle a new experiment', () => {
		assert.deepEqual(
			reducer({cta: 'Buy it now'}, {
				type: 'SET_EXPERIMENT_VARIANT',
				experiment: 'button',
				variant: 'green'
			}),
			{button: 'green', cta: 'Buy it now'}
		)
	})

	it ('Should change the variant of an existing experiment', () => {
		assert.deepEqual(
			reducer({button: 'green'}, {
				type: 'SET_EXPERIMENT_VARIANT',
				experiment: 'button',
				variant: 'red'
			}),
			{button: 'red'}
		)
	})
})

describe ('Experiment actions', () => {
	it ('Should fill the right information in the action', () => {
		assert.deepEqual(
			setExperimentVariant('experiment1', 'variant1'), 
			{
				type: 'SET_EXPERIMENT_VARIANT',
				experiment: 'experiment1',
				variant: 'variant1'
			}
		)
	})
})