import React from 'react';
import { connect } from 'react-redux';

function chooseRandomly (variants) {
	const weighedVariants = [];
	variants.forEach(variant => {
		const weight = variant.weight || 1;
		for (let i=0; i < variant.weight; i++) {
			weighedVariants.push(variant);
		}
	});
	return weighedVariants[Math.floor(Math.random() * (weighedVariants.length - 1))].name
}

function getRandomVariant(experiment) {
	const choose = experiment.choose || chooseRandomly;
	return choose(experiment.variants)
}

function createExperiments (experiments) {
	const initialState = {};
	for (let name in experiments) {
		initialState[name] = getRandomVariant(experiments[name]);
	}
	return function reducer (state = initialState, action) {
		switch (action.type) {
			case 'RESET_EXPERIMENT_VARIANT':
				return Object.assign({}, state, {[action.experiment]: getRandomVariant(experiments[action.experiment])})

			case 'SET_EXPERIMENT_VARIANT':
				return Object.assign({}, state, {[action.experiment]: action.variant})

			default:
				return state
		}
	}
}

function Variant (props) {
	return React.Children.only(props.children)
}

Variant.propTypes = {
	name: React.PropTypes.string.isRequired
};

function setExperimentVariant(experiment, variant) {
	return {
		type: 'SET_EXPERIMENT_VARIANT',
		experiment,
		variant
	}
}

function Selector (props) {
	const { variant, name, children } = props;
	let chosenOne;
	React.Children.forEach(children, child => {
		if (child.type === Variant && child.props.name === variant) {
			chosenOne = React.cloneElement(child, { experiment: name });
		}
	});
	return chosenOne || null
}

Selector.propTypes = {
	name: React.PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	return {
		variant: state.experiments[ownProps.name] || null
	}
};

const Experiment = connect(mapStateToProps)(Selector);

const prefix = '_react_redux_ab_';

function digestCookies(cookies) {
	let experiments = {};
	for (let key in cookies) {
		if (key.indexOf(prefix) === 0) {
			const name = key.slice(prefix.length);
			experiments[name] = cookies[key];
		}
	}
	return experiments
}

function bakeCookies(state, getter) {
	for (let experiment in state.experiments) {
		getter(prefix + experiment, state.experiments[experiment]);
	}
}

export { createExperiments, Variant, Experiment, setExperimentVariant, digestCookies, bakeCookies };
