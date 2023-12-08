function eventManagerFactory(element, eventType) {
    let functionArray = [];
    const eventManager = {
        functions:{
            add:addFunction,
            remove:removeFunction,
            clear:clearFunctionArray,
        },
    };
    element.addEventListener(eventType, _onEvent);
    return eventManager;

    function addFunction(func, priority = false){
        if(!priority || priority >= functionArray.length){functionArray.push(func);return;}
        functionArray.splice(priority,0,func);
    }
    function removeFunction(func){
        let index = functionArray.findIndex(item => item === func);
        functionArray.splice(index, 1);
    }
    function clearFunctionArray(){functionArray = []}
    //
    function _onEvent(e){
        functionArray.forEach(func => func(e));
    }
}

export default eventManagerFactory;