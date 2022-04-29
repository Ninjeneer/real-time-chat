/**
 * Clean an object by removing every password attribute
 * It mutates the object
 * @param payload payload to clean
 */
export function removePassword(payload): void {
    if (payload instanceof Array) {
        payload.forEach(removePassword);
    } else {
        for (const key of Object.keys(payload)) {
            if (typeof payload[key] === "object") {
                removePassword(payload[key]);
            } else {
                if (key === "password") {
                    delete payload[key];
                }
            }
        }
    }
}