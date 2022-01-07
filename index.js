import fetch from "node-fetch";
//create and export a class with the name of ShopifyAPI with a constructor that takes in a url and a token

class ShopifyAPI {
    constructor(url, token, apiKey) {
        this.url = url;
        this.token = token;
        this.auth = apiKey;
    }

    async getProducts() {

        //connect throw fetch to shopify url
        //set the header to include the token
        //set the header to include the auth
        //return the response
        //if the response is ok, return the json
        //if the response is not ok, return the error

        try {
            const response = await fetch(this.url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': this.token
                }
            });

            const json = await response.json();
            let parsed = this.parseInformation(json.products)
            return parsed;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    parseInformation(body) {
        //parse the information to return all the data we need
        let arrayOfProducts = [];
        body.forEach((data) => {
            let fullObject = [{
                price: data.variants[0].price ? data.variants[0].price : "0$",
                status: data.status,
                created_at: data.created_at,
            }]
            fullObject.unshift(data.title)
            arrayOfProducts.push(
                fullObject
            )
        })
        return arrayOfProducts;
    }
}

const shopify = new ShopifyAPI('https://devtestrecruitte.myshopify.com/admin/api/2021-07/products.json', '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', 'd156c699edcc98186dae8e6f9562d838');

console.log(await shopify.getProducts())