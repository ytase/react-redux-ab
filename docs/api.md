# `createExperiments(experiments) => reducer`

This function creates a reducer and select a value every experiment.

`experiments`: The argument must be an object, which keys correspond to the different experiments' names and values are objects with these properties:

- `variants`: a list of object with at least a `name` property.
- `(choose)`: a function that takes the variants as input and returns variant selected.


# Experiment

Experiment is a container that wraps Variants. It has only one property: `name`, that should correspond to one of the experiment created. If the name does not correspond to any known experiment, or if the experiment does not contain any Variant corresponding to the current vvalue for the user, nothing will be rendered by the Experiment.

# Variant

The `Variant` component should have **one** child that will be rendered if the variant's name matches the active variant for its parent experiment.

`name (required)`: A string describind the variant. An experiment should not have 2  Variant children with the same name.

# `setExperimentVariant(experiment, variant) => action`

Action to dispatch to change the variant of a specific experiment. use this if you want your user to manually change the variant for instance, or if you want to set the variant based on a query parameter or any other method.