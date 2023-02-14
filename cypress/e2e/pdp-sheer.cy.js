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
  
  const url = '/pages/seamless-sheer-bralettes/'
  
  let skus = []
  const pdpName = []
  

describe("Exit iframe", () => {
  it("exit from iframe if any", () => {
    cy.visit(url);
    // getIframeBody().find('#closeIconContainer').should('have.class', 'css-upw05v').click();
  });
});


  
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
  
  // pdp-liq
  // it should discounted price this item is final sale
  // on sale
  const pdps = ['/products/caribbean-sea-seamless-sheer-bralette', '/products/caribbean-sea-mesh-thong-panties', '/products/caribbean-sea-mesh-brief-panties', '/products/caribbean-sea-mesh-highwaisted-panties', '/products/lime-punch-mesh-bralette', '/products/lime-punch-mesh-brief', '/products/lime-punch-mesh-highwaisted', '/products/hyper-pink-mesh-highwaisted']
  
  const allPrices = '.mobile-intro .proPrice.flexRow.flexAlignCenter > div.priceProduct '
  const price = '.priceProduct.holidayPriceWrapper.strikethrough.bfx-price div';
  const sale = '.priceProduct.holidayPriceWrapper.standard.bfx-price'
  const hiddenPrice = '.priceProduct.bfx-price';
  const vipPrice = '.ebyProdTile-vipPriceWrapper'
  
  describe(`Check for what?`, () => {
  for( let i = 0; i < pdps.length; i++){
  // for( let i = 0; i < 2; i++){
  
          it(`Visits page ${pdps[i]}`, () => {
              cy.visit(pdps[i])
              cy.wait(1000)
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
  
          // it(`Original price to be hidden`, () => {
          //     // cy.wait();
          //     cy.get(allPrices).should('have.length', 3)
          // })  
          // it(`Should have only 1 sale price`, () => {
          //     // cy.wait();
          //     cy.get(sale).should('be.visible')
             
          // })        
  }
      })
  
  


  function getProductsList(){
    const pdp = '.eby-cy-link'
    const $grid = document.querySelectorAll(pdp)

    let uris = []
    for(const el of $grid){
      const id = el.href.split('products')[1]
      const uri = `/products${id}`
      
      uris.push(uri)
    }
    console.log(uris)

  }
  
  
  
  