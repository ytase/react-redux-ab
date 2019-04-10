import assert from 'assert'
import { createExperiments } from '../module/reducer'
import { setExperimentVariant, loadExperimentVariants } from '../module/actions'

const reducer = createExperiments({})

describe ('Experiments reducer', () => {
	it ('Should return the initial state', () => {
		assert.deepEqual(
			reducer(undefined, {}),
			{}
		)
	})

	it ('Should change the variant of an existing experiment', () => {
		const reducer = createExperiments({
			button: {
				variants: [
					{name: 'green'},
					{name: 'red'},
					{name: 'blue'}
				]
			}
		})
		assert.deepEqual(
			reducer({button: 'green'}, {
				type: 'SET_EXPERIMENT_VARIANT',
				experiment: 'button',
				variant: 'red'
			}),
			{button: 'red'}
		)
	})

	it ('Should not change the variant if experiment does not have the given variant', () => {
		const reducer = createExperiments({
			button: {
				variants: [
					{name: 'green'},
					{name: 'blue'}
				]
			}
		})
		assert.deepEqual(
			reducer({button: 'green'}, {
				type: 'SET_EXPERIMENT_VARIANT',
				experiment: 'button',
				variant: 'red'
			}),
			{button: 'green'}
		)
	})

	it ('Should mix correctly the inital state with the loaded experiments', () => {
		const reducer = createExperiments({
			'btnExp': {
				variants: [
					{name: 'blue'},
					{name: 'red'}
				]
			},
			'titleExp': {
				variants: [
					{name: 'big'},
					{name: 'small'}
				]
			}
		})

		const initialState = {'btnExp': 'blue', 'titleExp': 'small'}
		const loadedState = {'btnExp': 'red'}
		const finalState = reducer(initialState, {type: 'LOAD_EXPERIMENTS_VARIANTS', state: loadedState})
		assert.equal(finalState.btnExp, 'red')
		assert.equal(finalState.titleExp, 'small')
		assert(finalState.titleExp.length > 2)
	})

	it ('Should not load invalid variants in state', () => {
		const reducer = createExperiments({
			'btnExp': {
				variants: [
					{name: 'blue'},
					{name: 'red'}
				]
			},
			'titleExp': {
				variants: [
					{name: 'big'},
					{name: 'small'}
				]
			}
		})

		const initialState = {'btnExp': 'red', 'titleExp': 'big'}
		const loadedState = {'btnExp': 'green', 'titleExp': 'small'}
		const finalState = reducer(initialState, {type: 'LOAD_EXPERIMENTS_VARIANTS', state: loadedState})
		assert.equal(finalState.btnExp, 'red')
		assert.equal(finalState.titleExp, 'small')
		assert(finalState.titleExp.length > 2)
	})

	it ('Should drop now active experiments from the loading process', () => {
		const reducer = createExperiments({
			'btnExp': {
				variants: [
					{name: 'blue'},
					{name: 'red'}
				]
			},
		})

		const loadedState = {'titleExp': 'big'}
		const finalState = reducer(undefined, {type: 'LOAD_EXPERIMENTS_VARIANTS', state: loadedState})
		assert.equal(finalState.titleExp, undefined)
	})

	it ('Should return different inital states when called several time to support server side rendering', () => {
		const experiments = {
			test: {
				variants: [
					{name: 'blue'},
					{name: 'green'}
				]
			}
		}
		const reducer = createExperiments(experiments)
		let results = []
		for (let i=0; i < 200; i++) {
			results.push(reducer(undefined, {}))
		}
		results = results.map(state => state.test)
		assert(results.includes('blue'))
		assert(results.includes('green'))
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

	it ('Should fill the whole state in the load action', () => {
		const state = {
			button: 'blue',
			title: 'big'
		}
		assert.deepEqual(
			loadExperimentVariants(state),
			{type: 'LOAD_EXPERIMENTS_VARIANTS', state}
			)
	})
})

describe ('Experiment creator', () => {
	it ('Should fill the initial state with a random variant', () => {
		const reducer = createExperiments({
			'btnExp': {
				variants: [
					{name: 'blue'},
					{name: 'red'}
				]
			},
			'titleExp': {
				variants: [
					{name: 'big'},
					{name: 'small'}
				]
			}
		})
		const state = reducer(undefined, {})
		assert(state.btnExp.length > 2)
		assert(state.titleExp.length > 2)
	})
})