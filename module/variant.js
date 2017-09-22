import React from 'react'
import PropTypes from 'prop-types'

export function Variant (props) {
	return React.Children.only(props.children)
}

Variant.propTypes = {
	name: PropTypes.string.isRequired
}