const { checkIfEmailExists, checkIfUserExists } = require("./common")
const { checkPasswordStrength, validateEmail } = require("./common")

async function validateFields({
    username,
    email,
    password,
    passwordConfirmation,
    acceptsTerms,
    acceptsCommunications
}) {
    const errors = cleanUndefinedProperties({
        username: await getUserErrors(username),
        email: await getEmailErrors(email),
        password: getPasswordErrors(password),
        passwordConfirmation: getPasswordConfirmationErrors(passwordConfirmation, password),
        acceptsTerms: getAcceptsTermsErrors(acceptsTerms),
    })



    const success = Object.keys(errors).length === 0
    return cleanUndefinedProperties({
        success: success,
        errors: success ? undefined : errors
    })
}

function checkRequiredValueMissing(value) {
    return value === undefined || value.length === 0
}

async function getUserErrors(username) {
    if (checkRequiredValueMissing(username)) {
        return "Por favor introduza o seu endereço de username."
    }
    if (await checkIfUserExists(username)) {
        return "O username introduzido já está registado."
    }
}

async function getEmailErrors(email) {
    if (checkRequiredValueMissing(email)) {
        return "Por favor introduza o seu endereço de email."
    }
    if (!validateEmail(email)) {
        return "Por favor introduza um endereço de email válido."
    }
    if (await checkIfEmailExists(email)) {
        return "O endereço introduzido já está registado."
    }
}

function getPasswordErrors(password) {
    if (checkRequiredValueMissing(password)) {
        return "Por favor introduza a sua password."
    }
    if (password.length < 8) {
        return "A sua password deve ter no mínimo 8 caracteres."
    }
    if (checkPasswordStrength(password) < 4) {
        return "A sua password deve ter pelo menos um número, uma mínuscula, uma maiúscula e um símbolo."
    }
}

function getPasswordConfirmationErrors(passwordConfirmation, password) {
    if (checkRequiredValueMissing(passwordConfirmation)) {
        return "Por favor introduza novamente a sua password."
    }
    if (password !== passwordConfirmation) {
        return "As passwords não coincidem."
    }
}

function getAcceptsTermsErrors(acceptsTerms) {
    if (!acceptsTerms) {
        return "Tem de aceitar os termos e condições para criar a sua conta."
    }
}

function cleanUndefinedProperties(obj) {
    return Object.keys(obj)
        .reduce((acc, p) =>
            obj[p] !== undefined
                ? ({ ...acc, [p]: obj[p] })
                : acc,
            {})
}

export {
    validateFields
}