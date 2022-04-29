import { removePassword } from "../../src/application/middleware/remove-password.middleware";

describe("RemovePasswordMiddleware", () => {
    it("Should remove password from object", () => {
        const payload = {
            password: "123456",
            name: "John Doe"
        };
        removePassword(payload);
        expect(payload.password).not.toBeDefined();
    });

    it("Should remove password from nested object", () => {
        const payload = {
            nest: {
                password: "123456",
                name: "John Doe"
            }
        };
        removePassword(payload);
        expect(payload.nest.password).not.toBeDefined();
    });

    it("Should remove password from object in array", () => {
        const payload = [{
            password: "123456",
            name: "John Doe"
        }, {
            password: "abcdef",
            name: "John 2"
        }];
        removePassword(payload);
        expect(payload[0].password).not.toBeDefined();
        expect(payload[1].password).not.toBeDefined();
    });

    it("Should remove password from nested object in array", () => {
        const payload = [{
            nest: {
                password: "123456",
                name: "John Doe"
            }
        }, {
            nest: {
                password: "abcdef",
                name: "John 2"
            }
        }];
        removePassword(payload);
        expect(payload[0].nest.password).not.toBeDefined();
        expect(payload[1].nest.password).not.toBeDefined();
    });
})