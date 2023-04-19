/**
 * Creates an array of n length with the values 0 through n
 * @param {*} n
 * @returns
 */
export function arbritraryArray(n) {
    return Array.from(Array(n).keys());
}
/**
 * Returns true or false if the given object is in the array passed.
 * @param {*} obj
 * @param {*} list
 * @returns boolean
 */
export function containsObject(obj, list) {
    let i;
    for (i = 0; i < list.length; i++) {
        // console.log({ item: list[i], obj, exp: list[i] == obj });
        if (list[i].id === obj.id) {
            return true;
        }
    }

    return false;
}

/**
 * Create slug with given string
 * @param {*} str
 * @returns
 */
export const slugify = (str) =>
    str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
