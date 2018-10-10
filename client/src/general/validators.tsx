
export const Validators = {
    required: (errorMessage = null, dataKey = null, isZeroValid = false) =>
        (value, formValues, instanceRef, field) => {
            errorMessage = errorMessage ? errorMessage : 'Required';
            const actualValue = dataKey ? value ? value[dataKey] : null : value;
            return actualValue === undefined || actualValue === null || (actualValue === 0 && !isZeroValid ) || (typeof actualValue === 'string' && actualValue.trim() === '') ? errorMessage
                : undefined
        },
    maxlength: (errorMessage = null, max) =>
        (value, formValues, instanceRef, field) => {
            errorMessage = errorMessage ? errorMessage : `Must be ${max} characters or less`;
            return value && value.length > max
                ? errorMessage
                : undefined
        },
    minlength: (errorMessage = null, min) =>
        (value, formValues, instanceRef, field) => {
            errorMessage = errorMessage ? errorMessage : `Must be atleast ${min} characters or more`;
            return value && value.length > min
                ? `Must be atleast ${min} characters or more`
                : undefined
        },
    maxValue: (errorMessage = null, max) =>
        (value, formValues, instanceRef, field) => {
            errorMessage = errorMessage ? errorMessage : `Must be lesser than ${max}`;
            return value && value < max
                ? errorMessage
                : undefined
        },
    minValue: (errorMessage = null, min) =>
        (value, formValues, instanceRef, field) => {
            errorMessage = errorMessage ? errorMessage : `Must be greater than ${min}`;
            return value && value > min
                ? errorMessage
                : undefined
        },
    email: (errorMessage = null) =>
        (value, formValues, instanceRef, field) => {
            errorMessage = errorMessage ? errorMessage : 'Invalid email address';
            return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
                ? errorMessage
                : undefined
        },
    pattern: (errorMessage = null, regex) => {
        errorMessage = errorMessage ? errorMessage : 'Pattern does not match';
        return (value, formValues, instanceRef, field) =>
            value && !(new RegExp(regex).test(value))
                ? errorMessage
                : undefined
    },
    conditional: (condition, validator) =>
        (value, formValues, instanceRef, field) =>
            condition(formValues, instanceRef) ? validator(value) : undefined
}