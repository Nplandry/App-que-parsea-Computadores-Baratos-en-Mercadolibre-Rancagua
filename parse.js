

function parserApartamentData(){

    const getAtt = () => {
        const cantidadBaños = __PRELOADED_STATE__.initialState.components.technical_specifications.specs[0].attributes.find(x => x.id === 'Baños')?.text;
        return cantidadBaños
    }

/*
    const getMoreInfo = () => {
        let aditionalinfo = {
            info1 : __PRELOADED_STATE__.initialState.components,
            info2 : __PRELOADED_STATE__.initialState.components,
        };
        const result = __PRELOADED_STATE__.initialState.components."".split(", ");
        if(result.length === 2){
        aditionalinfo.1 = result[0];
        aditionalinfo.2 = result[1];
    } else {
        aditionalinfo.1 = "pasan cosas, avisar a soporte";
        aditionalinfo.2 = "pasan cosas, avisar a soporte";
    }
        return aditionalinfo;
    };
    */
    let apartamentData = {
        id : __PRELOADED_STATE__.initialState.components.bookmark.item_id,
        costo : {
            precio : __PRELOADED_STATE__.initialState.components.price.price.value,
            PrecioMoneda : __PRELOADED_STATE__.initialState.components.price.price.currency_symbol,
            masinfo : 'getAtt()',
        },
        masinfoo : "getMoreInfo()",
        };

    return apartamentData;
}

exports.parserApartamentData = parserApartamentData