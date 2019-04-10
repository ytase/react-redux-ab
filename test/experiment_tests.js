import React from 'react'
import { shallow } from 'enzyme'
import { Selector } from '../module/experiment'
import { Variant } from '../module/variant'
import assert from 'assert'


describe('Selector component', () => {
	it ('Should only return the selected variant', () => {
		const selector = shallow(<Selector name="button" variant="blue">
				<Variant name="blue"><span>Blue</span></Variant>
				<Variant name="red"><span>Red</span></Variant>
				<Variant name="green"><span>Green</span></Variant>
			</Selector>)
		assert.equal(selector.find(Variant).length, 1)
		assert.equal(selector.find(Variant).prop('name'), 'blue')
	})

	it ('Should render the child correctly', () => {
		const selector = shallow(<Selector name="button" variant="blue">
				<Variant name="blue"><span>Blue</span></Variant>
				<Variant name="red"><span>Red</span></Variant>
				<Variant name="green"><span>Green</span></Variant>
			</Selector>)
		assert.equal(selector.contains(<span>Blue</span>), true)
	})

	it ('Should render the original variant if experiment is not in store', () => {
		const selector = shallow(<Selector name="button" addExperiment={() => null}>
				<Variant name="blue"><span>Blue</span></Variant>
				<Variant name="red"><span>Red</span></Variant>
				<Variant name="original"><span>Original</span></Variant>
			</Selector>)
		assert.equal(selector.contains(<span>Original</span>), true)
	})
})