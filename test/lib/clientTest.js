'use strict';

const describe = require("mocha").describe;
const it = require("mocha").it;
const assert = require("assert");

const IpToAsnClient = require("../../lib/client");


describe("IpToAsnC Client", () => {
    it("should return resolved ASN from JSON response", async () => {
        const client = new IpToAsnClient();
        const result = await client.checkIp("188.247.240.199");

        assert.deepStrictEqual(result, { countryCode: 'RO', ASN: 39737, description: 'NETVISION-AS' });
    });

    it("should return resolved ASN from HTML response", async () => {
        const client = new IpToAsnClient({headers: {'Accept': 'text/html'},});
        const result = await client.checkIp("188.247.240.199");

        assert.deepStrictEqual(result, { countryCode: 'RO', ASN: 39737, description: 'NETVISION-AS' });
    });
});
