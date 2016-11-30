import React from 'react'
import { connect } from 'react-redux'
import { Variant } from './variant'
import { setExperimentVariant } from './actions'

export function Selector (props) {
	const { variant, name, children } = props
	let chosenOne
	React.Children.forEach(children, child => {
		if (child.type === Variant && child.props.name === variant) {
			chosenOne = React.cloneElement(child, { experiment: name })
		}
	})
	return chosenOne || null
}

Selector.propTypes = {
	name: React.PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
	return {
		variant: state.experiments[ownProps.name] || null
	}
}

export const Experiment = connect(mapStateToProps)(Selector)