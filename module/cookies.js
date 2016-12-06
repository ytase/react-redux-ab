export const prefix = '_react_redux_ab_'

export function digestCookies(cookies) {
	let experiments = {}
	for (let key in cookies) {
		if (key.indexOf(prefix) === 0) {
			const name = key.slice(prefix.length)
			experiments[name] = cookies[key]
		}
	}
	return experiments
}

export function bakeCookies(state, setter) {
	for (let experiment in state.experiments) {
		setter(prefix + experiment, state.experiments[experiment])
	}
}
