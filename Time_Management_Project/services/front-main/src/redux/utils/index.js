export function successResponseCondition(status, errMessage) {
    return status >= 200 && status < 300 && !errMessage
}