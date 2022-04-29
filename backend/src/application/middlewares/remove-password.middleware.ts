export function removePassword(payload): void {
    if (payload instanceof Array) {
        for (const p of payload) {
            removePassword(p);
        }
    } else {
        for (const key of Object.keys(payload)) {
            if (typeof payload[key] === "object") {
                removePassword(payload[key]);
            } else {
                if (key === "password") {
                    console.log("found")
                    delete payload[key];
                }
            }
        }
    }
}