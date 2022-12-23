const getIframeDocument = () => {
  return cy
  .get('iframe#attentive_creative')
  .its('0.contentDocument').should('exist');
}

const getIframeBody = () => {
  // get the document
  return getIframeDocument()
  .its('body').should('not.be.undefined')
  .then(cy.wrap);
}

const url = '/collections/seamless-panties/products.json?limit=200';

let skus = []
const pdpName = []

describe(`Grab all the pdp SKU and Array of pdps`, () => {
    it(`Grabs data from ${url}`, () =>{
        cy.request({
            method: 'GET',
            url: url,
            followRedirect: false,
            headers: {
                'accept': 'application/json'
            }
        })
        .then((response) => {
            // Parse JSON the body.
            let newData = response.body.products;

            for(let pdp of newData){
                if(pdp.tags.includes('#Sale')){
                    skus.push(pdp.id)
                    pdpName.push('/products/' + pdp.handle)
                }
            }
        });
    })    
});

describe('Data is in console log', () => {
    it('copy and past data if prefer', () => {
    		console.clear()
            console.log('-------------------------------------')
            console.log(JSON.stringify(skus))
            console.log(JSON.stringify(pdpName) )
            console.log('-------------------------------------')
    })
})

// sunkissed brief
function grabHrefCollection(){

    let link = []
    const getHref = document.querySelectorAll('.proFeaturedImage')
    for(let el of getHref){
        const href = el.getAttribute('href')
        link.push(href)
    }    

    console.log(JSON.stringify(link))
}

// on sale
const pdps = ["/products/black-brief-panties","/products/black-bikini-panties","/products/lime-punch-high-cut-high-waisted","/products/nude-cheeky","/products/nude-bikini-panties","/products/high-waisted-opal-blue-panties","/products/opal-blue-thong-panties","/products/spotted-panther-brief","/products/spotted-panther-highwaisted","/products/black-high-waisted-panties","/products/nude-brief-panties","/products/nude-high-waisted-panties","/products/blue-opal-cotton-brief","/products/black-thong","/products/poppy-red-cheeky-panties","/products/poppy-red-high-waisted-panties","/products/grey-bikini-panties","/products/blue-opal-bikini-panties","/products/black-cheeky-panties","/products/black-high-waisted-thong","/products/dark-palm-brief","/products/sleek-tiger-highwaisted","/products/sleek-tiger-bikini","/products/sleek-tiger-brief","/products/sleek-tiger-thong","/products/blue-opal-cotton-bikini","/products/brief-provincial-blue-panties","/products/laurel-green-high-waisted-panties","/products/laurel-green-brief-panties","/products/fjord-blue-highwaisted","/products/sunkissed-brief","/products/keepsake-lilac-high-waisted-panties","/products/cheeky-laurel-green-underwear","/products/fjord-blue-thong","/products/keepsake-lilac-bikini-panties","/products/sunkissed-thong","/products/fallen-rock-cotton-brief-panties","/products/blue-iris-highwaisted","/products/blue-opal-high-waisted-thong","/products/fallen-rock-cotton-bikini-panties","/products/black-cotton-brief-panties","/products/blue-iris-brief","/products/black-cotton-bikini-panties","/products/lime-punch-highwaisted","/products/lime-punch-bikini","/products/fallen-rock-cotton-thong-panties","/products/laurel-green-cotton-bikini","/products/laurel-green-cotton-brief","/products/provincial-blue-thong-panties","/products/nude-thong","/products/highwaisted-nude-thong"]

const allPrices = '.mobile-intro .proPrice.flexRow.flexAlignCenter > div.priceProduct '
const price = '.priceProduct.holidayPriceWrapper.strikethrough.bfx-price div';
const sale = '.priceProduct.holidayPriceWrapper.standard.bfx-price'
const hiddenPrice = '.priceProduct.bfx-price';
const vipPrice = '.ebyProdTile-vipPriceWrapper'

// /products/sunkissed-brief
// /products/grey-bikini-panties
// /products/sleek-tiger-thong
// /products/sleek-tiger-brief
describe(`Check prices are hidden`, () => {
for( let i = 0; i < pdps.length; i++){
// for( let i = 0; i < 2; i++){

        it(`Visits page ${pdps[i]}`,{ scrollBehavior: false }, () => {
            cy.visit(pdps[i])
            // getIframeBody().find('#closeIconContainer').should('have.class', 'css-upw05v').click();
            // console.log(JSON.stringify(pdps))
        });
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            console.log('---------------------------------');
            console.log(err);
            console.log(runnable);
            console.log('---------------------------------');
            return false
        })

        it(`Original price to be hidden`, () => {
            // cy.wait();
            cy.get(allPrices).should('have.length', 3)
        })  
        it(`Should have only 1 sale price`, () => {
            // cy.wait();
			cy.get(sale).should('be.visible')
           
        })        
}
    })





