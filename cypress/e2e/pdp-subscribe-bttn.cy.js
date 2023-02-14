/*
    ***********************************
    *  :: Paste Array in pdps ::
    *  Change values here
     _._     _,-'""`-._
    (,-.`._,'(       |\`-/|
        `-.-' \ )-`( , o o)
              `-    \`_`"'-
    open cypress -> npx cypress open
    report ---> npx cypress run --reporter mochawesome
    ************************************
*/

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

const url = '/collections/seamless-underwear/products.json?limit=200';

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
                // if(pdp.tags.includes('#Sale')){
                    skus.push(pdp.id)
                    pdpName.push('/products/' + pdp.handle)
                // }
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
const pdps = [
  '/products/peach-bloom-thong',
  '/products/keepsake-lilac-brief-panties',
  '/products/piki-high-cut',
  '/products/ocean-depths-high-cut',
  '/products/picnic-rose-brief',
  '/products/nude-bikini-panties',
  '/products/nude-cheeky',
  '/products/highwaisted-nude-thong',
  '/products/nude-thong',
  '/products/exotic-botanical-high-cut',
  '/products/poppy-red-brief-panties',
  '/products/blue-opal-brief-panties',
  '/products/blue-opal-thong-panties',
  '/products/dark-palm-thong',
  '/products/castle-wall-thong',
  '/products/castle-wall-brief-panties',
  '/products/green-millieu-thong',
  '/products/rose-dust-pink-thong-panties',
  '/products/fallen-rock-high-waisted-panties',
  '/products/fallen-rock-bikini',
  '/products/black-thong',
  '/products/black-high-waisted-thong',
  '/products/black-high-waisted-panties',
  '/products/black-cheeky-panties',
  '/products/white-thong-panties',
  '/products/high-waisted-white-panties',
  '/products/white-cheeky',
  '/products/brief-white-panties',
  '/products/grey-brief-panties',
  '/products/grey-bikini-panties',
  '/products/grey-cheeky-panties',
  '/products/grey-high-waisted-panties',
  '/products/grey-thong-panties',
  '/products/raindrop-thong-panties',
  '/products/nude-high-waisted-panties',
  '/products/ocean-depths-highwaisted',
  '/products/ocean-depths-bikini',
  '/products/ocean-depths-brief',
  '/products/brief-provincial-blue-panties',
  '/products/cheeky-laurel-green-underwear',
  '/products/sleek-tiger-brief',
  '/products/sleek-tiger-bikini',
  '/products/sleek-tiger-thong',
  '/products/provincial-blue-thong-panties',
  '/products/piki-highwaisted',
  '/products/fallen-rock-brief-panties',
  '/products/fallen-rock-cheeky',
  '/products/fallen-rock-thong',
  '/products/exotic-botanical-bikini-panties',
  '/products/exotic-botanical-thong',
  '/products/castle-wall-highwaisted'
]

const allPrices = '.mobile-intro .proPrice.flexRow.flexAlignCenter > div.priceProduct '
const price = '.priceProduct.holidayPriceWrapper.strikethrough.bfx-price div';
const sale = '.priceProduct.holidayPriceWrapper.standard.bfx-price'
const hiddenPrice = '.priceProduct.bfx-price';
const vipPrice = '.ebyProdTile-vipPriceWrapper'

describe(`Check prices are hidden`, () => {
for( let i = 0; i < pdps.length; i++){
// for( let i = 0; i < 2; i++){

        it(`${i} .Visits page ${pdps[i]}`,{ scrollBehavior: false }, () => {
            cy.visit(pdps[i])
            // getIframeBody().find('#closeIconContainer').should('have.class', 'css-upw05v').click();
            // console.log(JSON.stringify(pdps))
            // cy.scrollTo(0,1200)
            // cy.wait(1000)
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
        it('After checking the element addToCartToggleButton.sub subscription button should be visible', () => {
            cy.get('.addToCartToggler li.addToCartToggleButton.sub').then((el) => {
                console.log(el)
                cy.wait(1000)
                cy.get(el).click()
                
                cy.get('#AddBoxToCart')
                    .should('be.visible')
            })
        })


}
    })





