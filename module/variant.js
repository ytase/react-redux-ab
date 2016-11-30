import React from 'react'

export function Variant (props) {
	return React.Children.only(props.children)
}

Variant.propTypes = {
	name: React.PropTypes.string.isRequired
}