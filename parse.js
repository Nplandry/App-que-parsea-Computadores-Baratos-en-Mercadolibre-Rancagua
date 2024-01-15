

function parserApartamentData(){

    const getAtt = () => {
        const cantidadBaños = __PRELOADED_STATE__.initialState.components.technical_specifications.specs[0].attributes.find(x => x.id === 'Baños')?.text;
        return cantidadBaños
    }


    const getLocation = () => {
        let localizacion = {
            coordenadas : __PRELOADED_STATE__.initialState.components.location.map_info.location,
            ubicacion : __PRELOADED_STATE__.initialState.components.location.map_info.item_address,
        };
        const result = __PRELOADED_STATE__.initialState.components.location.map_info.item_location.split(", ");
        if(result.length === 2){
        localizacion.barrio = result[0];
        localizacion.ciudad = result[1];
    } else {
        localizacion.barrio = "pasan cosas, avisar a soporte";
        localizacion.ciudad = "pasan cosas, avisar a soporte";
    }
        return localizacion;
    };
    
    let apartamentData = {
        id : __PRELOADED_STATE__.initialState.components.bookmark.item_id,
        costo : {
            precio : __PRELOADED_STATE__.initialState.components.price.price.value,
            PrecioMoneda : __PRELOADED_STATE__.initialState.components.price.price.currency_symbol,
            Baños : 'getAtt()',
        },
        localizacion : getLocation(),
        };

    return apartamentData;
}

exports.parserApartamentData = parserApartamentData