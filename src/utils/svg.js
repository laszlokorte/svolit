const domPoint = new DOMPoint()

export function eventToViewbox(evt) {
    const target = evt.currentTarget
    const svg = target.tagName === 'svg' ? target : evt.currentTarget.ownerSVGElement;
    domPoint.x = evt.clientX;
    domPoint.y = evt.clientY;

    let {x,y} =  domPoint.matrixTransform(svg.getScreenCTM().inverse());
    
    return {x,y}
}