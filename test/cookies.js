import { bakeCookies, digestCookies, prefix } from '../module/cookies'
import assert from 'assert'

describe('bakeCookies utility method', () => {
	it('Should call the callback for every experiment / variant couple', () => {
		const fakeCookies = {}
		const fakeCookieSetter = (name, value, options) => {
			fakeCookies[name] = value
		}
		const state = {
			experiments: {
				'experiment1': 'green',
				'experiment2': 'blue'
			}
		}
		bakeCookies(state, fakeCookieSetter)
		assert.equal(fakeCookies[prefix + 'experiment1'], 'green')
		assert.equal(fakeCookies[prefix + 'experiment2'], 'blue')
	})
})

describe('digestCookies utility method', () => {
	it ('Should take correctly values from the function provided', () => {
		const fakeCookies = {someOtherCookie: 123456}
		fakeCookies[prefix + 'validExp'] = 'blue'
		fakeCookies[prefix + 'validExp2'] = 'green'
		fakeCookies['another_prefix' + prefix + 'something_else']
		const state = digestCookies(fakeCookies)
		assert.deepEqual(state, {
			validExp: 'blue',
			validExp2: 'green'
		})
	})	
})