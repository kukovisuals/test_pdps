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
//const pdps = ["/products/black-bralette","/products/black-brief-panties","/products/poppy-red-bralette","/products/poppy-red-high-waisted-panties","/products/nude-bralette","/products/nude-bikini-panties","/products/ocean-depths-bralette-bodysuit","/products/spotted-panther-bralette","/products/spotted-panther-brief","/products/spotted-panther-highwaisted","/products/blue-opal-seamless-tank","/products/blue-opal-bralette","/products/opal-blue-thong-panties","/products/lime-punch-high-cut-high-waisted","/products/lime-punch-highwaisted","/products/lime-punch-bikini","/products/blue-iris-bralette","/products/blue-iris-brief","/products/fallen-rock-cotton-bralette","/products/fallen-rock-cotton-brief-panties","/products/fallen-rock-cotton-bikini-panties","/products/fallen-rock-cotton-thong-panties","/products/sunkissed-brief","/products/keepsake-lilac-bralette","/products/keepsake-lilac-high-waisted-panties","/products/keepsake-lilac-bikini-panties","/products/laurel-green-cotton-bralette","/products/laurel-green-cotton-brief","/products/laurel-green-cotton-bikini","/products/nude-brief-panties","/products/nude-high-waisted-panties","/products/nude-thong","/products/highwaisted-nude-thong","/products/nude-cheeky","/products/blue-opal-cotton-bralette","/products/high-waisted-opal-blue-panties","/products/blue-opal-cotton-brief","/products/blue-opal-cotton-bikini","/products/poppy-red-cheeky-panties","/products/black-cotton-bralette-1","/products/black-cotton-brief-panties","/products/black-cotton-bikini-panties","/products/black-high-waisted-panties","/products/black-cheeky-panties","/products/black-bikini-panties","/products/black-thong","/products/fjord-blue-highwaisted","/products/fjord-blue-thong","/products/lime-punch-eco-silk-scarf","/products/laurel-green-bralette","/products/provincial-blue-bralette","/products/blue-iris-highwaisted","/products/laurel-green-high-waisted-panties","/products/grey-bikini-panties","/products/sleek-tiger-bikini","/products/black-high-waisted-thong","/products/cheeky-laurel-green-underwear","/products/blue-opal-bikini-panties","/products/blue-opal-high-waisted-thong","/products/dark-palm-brief","/products/sleek-tiger-brief","/products/sleek-tiger-highwaisted","/products/sleek-tiger-thong","/products/sunkissed-thong","/products/laurel-green-brief-panties","/products/brief-provincial-blue-panties","/products/provincial-blue-thong-panties"]

const allPrices = '.mobile-intro .proPrice.flexRow.flexAlignCenter > div.priceProduct '
const price = '.priceProduct.holidayPriceWrapper.strikethrough.bfx-price div';
const sale = '.priceProduct.holidayPriceWrapper.standard.bfx-price'
const hiddenPrice = '.priceProduct.bfx-price';
const vipPrice = '.ebyProdTile-vipPriceWrapper'

describe(`Check prices are hidden`, () => {
    // for( let i = 0; i < pdpName.length/2; i++){
    for( let i = 0; i < 1; i++){

        it(`Visits page ${pdpName[i]}`,{ scrollBehavior: false }, () => {
            cy.visit(pdpName[i])
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
            let priceText;

            // Save the text of the price element to a variable
            cy.get('.mobile-intro .priceProduct.holidayPriceWrapper.standard.bfx-price').invoke('text').then((text) => {
                priceText = text.trim();
            });
            
            // Check if '.swatch-element.available' exists
            cy.get('.js-swatch.swatch.clearfix').then(($el) => {
                if ( $el.is(':visible') ) {
                    // If available, click on the first '.swatch-element.available'
                    cy.get('.js-swatch.swatch.clearfix .swatch-element label')
                    .filter('[data-available="true"]').first().click();
                } else {
                    // If not available, click on the first and then the second child of '.select-dropdown.dropdown-trigger'
                    cy.get('.select-dropdown.dropdown-trigger').first().click();
                    cy.get('.select-dropdown.dropdown-trigger').first().find('li').eq(2).click();
                    cy.get('.select-dropdown.dropdown-trigger').eq(1).click();
                    cy.get('.select-dropdown.dropdown-trigger').eq(1).find('li').eq(2).click();
                }
            });

            // Click on 'Add to Cart' button
            cy.get('#AddToCartText').click()
            cy.wait(2500) // Wait for 2.5 seconds for the cart to update

            // Open the side cart
            cy.get('.eby-mobile-nav.bkgrn-white-color-dark .ebyicon-minicart-empty-alt').click()

            // Check if the price in the cart matches the saved price
            cy.get('.has-discount.bfx-product-subtotal.bfx-price').invoke('text').should((cartPriceText) => {
                expect(cartPriceText.trim()).to.eq(priceText)
            });
        });        
    }
});





