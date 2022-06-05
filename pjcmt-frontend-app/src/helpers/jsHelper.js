//#TRIGGERING
function triggerEventOnElement(element, eventname, options) {
    element.dispatchEvent(new Event(eventname, options));
}

export default{
    triggerEventOnElement
}