const phoneMask = [
    '(', /[1-9]/, /[0-9]/, /[0-9]/, ')',
    ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-',
    /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/
];

const postalCodeMask = [
    /[ABCEGHJ-NPRSTVXY]/i, /[0-9]/, /[ABCEGHJ-NPRSTV-Z]/i, ' ',
    /[0-9]/, /[ABCEGHJ-NPRSTV-Z]/i, /[0-9]/
];

interface Validation {
    masks: Record<string, Array<string | RegExp>>;
    regexes: Record<string, RegExp>;
    errors: Record<string, string>;
}

export function useValidation(): Validation {
    return {
        masks: {
            phone_number: phoneMask,
            post_code: postalCodeMask
        },
        regexes: {
            phone_number: /^\([1-9][0-9][0-9]\) [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$/,
            post_code: /^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z] [0-9][ABCEGHJ-NPRSTV-Z][0-9]$/,
            email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        },
        errors: {
            phone_number: 'Numéro de téléphone invalide.',
            post_code: 'Code postal invalide.',
            email: 'Addresse courriel invalide.'
        }
    };
}
