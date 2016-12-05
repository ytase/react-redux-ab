import { chooseRandomly } from '../module/reducer'
import assert from 'assert'

describe('Default choose function', () => {
	it('Should return the only variant when there is only one', () => {
		const variants = [{name: 'myown'}]
		assert.equal(chooseRandomly(variants), 'myown')
	})

	it('Should return all the elements in the variants', () => {
		const results = []
		const variants = [
			{name: 'blue'},
			{name: 'red'},
			{name: 'green'}
		]
		// Running 200 times to be sure we can get the 3 variants
		for (let i =0; i < 200; i++) {
			results.push(chooseRandomly(variants))
		}
		assert(results.includes('blue'))
		assert(results.includes('green'))
		assert(results.includes('red'))
	})
})