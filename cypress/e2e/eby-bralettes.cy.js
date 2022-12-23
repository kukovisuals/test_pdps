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

const url = '/collections/bralettes-for-women/products.json?limit=200';

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
const pdps = ["/products/black-bralette","/products/nude-bralette","/products/blue-opal-bralette","/products/spotted-panther-bralette","/products/blue-iris-bralette","/products/laurel-green-cotton-bralette","/products/poppy-red-bralette","/products/fallen-rock-cotton-bralette","/products/black-cotton-bralette-1","/products/blue-opal-cotton-bralette","/products/provincial-blue-bralette","/products/laurel-green-bralette","/products/keepsake-lilac-bralette"]

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
// for( let i = 0; i < pdps.length; i++){
for( let i = 0; i < 2; i++){

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





