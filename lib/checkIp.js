'use strict';

const cheerio = require('cheerio');

module.exports = function checkIp(ip) {

    const baseUrl = `https://api.iptoasn.com/v1/as/ip/${ip}`;

    return this.dispatch(baseUrl)
        .then(res => {
            if (res.status !== 200) Error(`Server responded with ${res.status} status code`);
            if (!res.data) return Error("No response from server");

            const result = getFromJson(res.data);

            // The server should respond with JSON but it's not always the case. Sometimes the response is in HTML.
            return (result)
                ? result
                : parseHtml(res.data)
        })
};

function getFromJson(data) {
    if (data.as_country_code === undefined) return null;

    return {
        countryCode: data.as_country_code,
        ASN: data.as_number,
        description: data.as_description,
    }
}

function parseHtml(data) {
    const $ = cheerio.load(data);
    const trs = $('table tr');

    if (trs.length === 0) return new Error("No data");

    let countryCode = "";
    let ASN = "";
    let description = "";

    $(trs).each((i, el) => {
        const th = $(el).find('th').text();
        const tdText = $(el).find('td').text();

        switch (th) {
            case "AS Number": {
                ASN = parseInt(tdText);
                break;
            }
            case "AS Description": {
                description = tdText;
                break;
            }
            case "AS Country code": {
                countryCode = tdText;
                break;
            }
        }
    });

    return {countryCode, ASN, description};
}
