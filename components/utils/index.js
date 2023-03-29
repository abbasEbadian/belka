/**
 * Checks wether an input is numeric or not . 
 * @param {String} value 
 * @returns {boolean}
 */
export const is_float = (value) => {
    if(!value) return true
    const isok  = [...value].every(e => !isNaN(e) || e === '.')
    const one_dot = String(value).indexOf('.') === String(value).lastIndexOf(".")
    return isok && one_dot
}