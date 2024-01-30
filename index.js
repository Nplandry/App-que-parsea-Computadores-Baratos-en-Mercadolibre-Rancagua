const puppeteer = require('puppeteer')
//document.getElementsByClassName('ui-search-layout__item')[0].getElementsByClassName('ui-search-link')[0].href
const { parserApartamentData } = require('./parse')

async function ParseLinks(urlToParse){

//Iniciar browser en puppeteer y desactiva el modo mostrar en consola
const browser = await puppeteer.launch({headless : false})

//Espera y abre una nueva pagina en el browser
const page = await browser.newPage()

//Setea el tamaño de la pagina que abrira
await page.setViewport({
    width: 1600,
    height: 1080,
    deviceScaleFactor: 1
});
//Dirige la pagina que va a abrir a nuestro link para parsear
await page.goto(urlToParse);

//await page.waitForTimeout(4000);

//Evalua la funcion que contiene nuestro objeto donde se parsean los apartamentos
const apartamentsLink = await page.evaluate(parserApartamentData)


console.log(apartamentsLink);
//return obtenerLinks
}





//Funcion que obtiene todos los link de las publicaciones del url en Mercado Libre
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
        //Funcion que obtiene el link del apartamento mediante la consola
        function getLink(publish){
            return publish.getElementsByClassName('ui-search-link__title-card')[0].href}
        //Ruta para obtener todas las publicaciones
        let allPublish = document.getElementsByClassName('ui-search-layout__item')
        //Recorrer todas las publicaciones para obtener sus links
        return Array.from(allPublish).map(x => getLink(x))
    })
    console.log(getAllPublishLink)
    return getAllPublishLink;
}

//Funcion que encuentra paginas para poder parsearlas
function getDesdeDeLaPagina(numeroDePagina){
    const encontrarDesde = (48 * (numeroDePagina - 1) + 1)
    const encontrarDesdeJSON = JSON.stringify(encontrarDesde)
return `https://listado.mercadolibre.cl/computacion-en-libertador-b-ohiggins/computadores${'_Desde_'+ (encontrarDesdeJSON) + '_NoIndex_True'}`
}

//const appartamentToParse = 'https://apartamento.mercadolibre.com.uy/MLU-667897094-venta-en-pozo-apartamentos-monoambiente-1-y-2-dormitorios-en-el-centro-de-montevideo-_JM#position=16&search_layout=grid&type=item&tracking_id=8437de64-d8fc-4664-9dcd-2839b61d8c12'

//Funcion que inicia la app para parsear
(async ()=> {
    const urlToParse = "https://listado.mercadolibre.cl/computacion-en-libertador-b-ohiggins/computadores_NoIndex_True#applied_filter_id%3Dstate%26applied_filter_name%3DUbicaci%C3%B3n%26applied_filter_order%3D10%26applied_value_id%3DCL-LI%26applied_value_name%3DLibertador+B.+O%27Higgins%26applied_value_order%3D8%26applied_value_results%3D1116%26is_custom%3Dfalse"
    //Hacer que la app recorra y encuentre todos los links de los computadores
    const apartamentsLink = await getApartamentsLink(urlToParse);
    //Bucle Que va parseando todos los links 
    for(let i = 0; i < apartamentsLink.length; i++){
        console.log(`Parseando apartamento numero:  ${i}`)
        const appartamentData = await ParseLinks(apartamentsLink[i])
        console.log(appartamentData)
    }
})();


//END
