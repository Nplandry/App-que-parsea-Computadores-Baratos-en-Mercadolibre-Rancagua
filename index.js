const puppeteer = require('puppeteer')
//document.getElementsByClassName('ui-search-layout__item')[0].getElementsByClassName('ui-search-link')[0].href
const { parserApartamentData } = require('./parse')

async function ParseLinks(urlToParse){

const browser = await puppeteer.launch({headless : false})

const page = await browser.newPage()

await page.setViewport({
    width: 1600,
    height: 1080,
    deviceScaleFactor: 1
});

await page.goto(urlToParse);

//await page.waitForTimeout(4000);


const apartamentsLink = await page.evaluate(parserApartamentData)


console.log(apartamentsLink);
//return obtenerLinks
}



//
async function getApartamentsLink(apartamentsLink){
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();
    await page.setViewport({
        width: 1600,
        height: 1080,
        deviceScaleFactor: 1
    });;
    await page.goto(apartamentsLink);
    const getAllPublishLink = await page.evaluate(()=> {
        function getLink(publish){
            return publish.getElementsByClassName('ui-search-link__title-card')[0].href}
        let allPublish = document.getElementsByClassName('ui-search-layout__item')
        return Array.from(allPublish).map(x => getLink(x))
    })
    console.log(getAllPublishLink)
    return getAllPublishLink;
}


function getDesdeDeLaPagina(numeroDePagina){
    const encontrarDesde = (48 * (numeroDePagina - 1) + 1)
    const encontrarDesdeJSON = JSON.stringify(encontrarDesde)
return `https://listado.mercadolibre.com.uy/inmuebles/montevideo/motevideo${'_Desde_'+ (encontrarDesdeJSON) + '_NoIndex_True'}`
}

//const appartamentToParse = 'https://apartamento.mercadolibre.com.uy/MLU-667897094-venta-en-pozo-apartamentos-monoambiente-1-y-2-dormitorios-en-el-centro-de-montevideo-_JM#position=16&search_layout=grid&type=item&tracking_id=8437de64-d8fc-4664-9dcd-2839b61d8c12'


(async ()=> {
    const urlToParse = "https://listado.mercadolibre.com.uy/inmuebles/apartamentos/alquiler/motevideo"

    const apartamentsLink = await getApartamentsLink(urlToParse);
    for(let i = 0; i < apartamentsLink.length; i++){
        console.log(`Parseando apartamento numero:  ${i}`)
        const appartamentData = await ParseLinks(apartamentsLink[i])
        console.log(appartamentData)
    }
})();