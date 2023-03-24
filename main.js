/* 
make a function called getFormattedCoinData that accepts a coin name as a parameter and return a promise that resolves the following: 
{
    coinName: "Bitcoin",
    genesis_date: "2009-01-03",
    usd_price: 20681,
    ath_usd: 69045
}
The API endpoint will be similar to this endpoint to get bitcoin information: https://api.coingecko.com/api/v3/coins/bitcoin
*/

const { default: axios } = require("axios");

function getFormattedCoinData(coin){
    return axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`)
        .then(({data})=>{
            currentUSD = 28355.90
            resolvedObj = {
                coinName: data.id,
                genesis_date: data.genesis_date,
                usd_price: data.market_data.current_price.btc * currentUSD,
                ath_usd: data.market_data.ath.btc * currentUSD
            }
            console.log(resolvedObj)
            return resolvedObj
        })
        .catch((error)=>{
            return error.message
        })
}

//getFormattedCoinData('bitcoin')



/***********************************************************************************************************************************/



/* 
Use this api endpoint: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false



Write a function that accepts no parameters, and returns a promise that resolves the top 5 cryptocurrenty coins by the "price_change_percentage_24h" property.


//access res.data.price_change_percentage_24h & data.current_price

Have the output be an array of coin objects where each coin object looks like this (example of bitcoin): 

{
  name: "Bitcoin",
  current_price: 28000,
  price_change_percentage_24h: 1.8163
}


Limit the output to the top 5 coins by price_change_percentage_24h

*/
const problem2URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`

function getTop5(){
    return axios.get(problem2URL)
        .then(({data})=>{
            //data already an array
            //first sort it, then slice it, then map it
            return data.sort((coinA, coinB)=> coinB.price_change_percentage_24h - coinA.price_change_percentage_24h)
                        .slice(0,5)
                        .map((coinObj)=>{
                            return {
                                name: coinObj.name,
                                current_price: coinObj.current_price,
                                price_change_percentage_24h: coinObj.price_change_percentage_24h
                            }
                        })

        })
        .catch((err)=>{
            return err.message
        })
}

//getTop5()



/***********************************************************************************************************************************/




/* 

Write a function called getFormattedCoinData that accepts a coin name as a parameter and uses this api endpoint (which part of this url can change depending on the function parameters?): https://api.coingecko.com/api/v3/coins/bitcoin

The function should output a promise that resolves an OBJECT that has this format (How would you get the key "coinName" to be there even if the api doesn't have a key called "coinName"?

{
    coinName: "Bitcoin",
    genesis_date: "2009-01-03",
    usd_price: 20681,
    ath_usd: 69045
}


*/

const BASE_URL = "https://api.coingecko.com/api/v3/coins"
const currentBitCoinUSD = 28029.40

function getFormattedCoinData2(coin){
    return axios.get(`${BASE_URL}/${coin}`)
        .then(({data})=>{
            return {
                coinName: data.id,
                genesis_date: data.genesis_date,
                usd: data.market_data.current_price.btc * currentBitCoinUSD,
                ath: data.market_data.ath.btc * currentBitCoinUSD
            }
        })
        .catch((err)=>{
            return err.message
        })
}

//getFormattedCoinData2("ethereum")
