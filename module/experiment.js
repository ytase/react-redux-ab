import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Variant } from './variant'

export const originalVariant = 'original'

export function Selector (props) {
	const { variant, name, children } = props
	let chosenOne, originalOne
	React.Children.forEach(children, child => {
		if (child.type === Variant) {
			if (child.props.name === variant) {
				chosenOne = React.cloneElement(child, { experiment: name })
			}
			if (child.props.name === originalVariant) {
				originalOne = React.cloneElement(child, { experiment: name })
			}
		}
	})
	return chosenOne || originalOne || null
}

Selector.propTypes = {
	name: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
	return {
		variant: state.experiments[ownProps.name] || null
	}
}

export const Experiment = connect(mapStateToProps)(Selector)