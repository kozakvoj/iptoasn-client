'use strict';

const axios = require("axios");

class IpToAsnClient {
    constructor(options = {}) {
        this.options = options ;
    }
}

IpToAsnClient.prototype.dispatch = function(baseURL) {
    return axios.create({
        baseURL,
        headers: this.options.headers || {'Accept': '*/json'},
        timeout: this.options.timeout || 5000
    }).get(baseURL)
};

IpToAsnClient.prototype.checkIp = require("./checkIp");

module.exports = IpToAsnClient;