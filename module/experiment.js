import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Variant } from './variant'

export function Selector (props) {
	const { variant, name, children } = props
	let chosenOne

	React.Children.forEach(children, child => {
		if (child.type === Variant && child.props.name === (variant || 'original')) {
			chosenOne = React.cloneElement(child, { experiment: name })
		}
	})
	return chosenOne || null
}

Selector.propTypes = {
	name: PropTypes.string.isRequired,
}

export const Experiment = connect(
    (state, ownProps) => ({
		variant: state.experiments[ownProps.name] || null
	})
)(Selector)