const domPoint = new DOMPoint()

export function eventToRealtive(evt) {
    const target = evt.currentTarget
    const rect = target.getBoundingClientRect();

    const relativeX = (evt.clientX - rect.left) / rect.width
    const relativeY = (evt.clientY - rect.top) / rect.height

    return {
        relativeX, relativeY
    }
}