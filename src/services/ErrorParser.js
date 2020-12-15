export const parseError = (error) => {
    let parsedErrors = []
    for(var ind in error) {
        parsedErrors.push(...error[ind])
    }
    console.log(parsedErrors)
    return parsedErrors;
} 