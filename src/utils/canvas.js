export function eventToViewbox(evt) {
    const target = evt.currentTarget
    const rect = target.getBoundingClientRect();

    const rx = (evt.clientX - rect.left) / rect.width - 0.5
    const ry = (evt.clientY - rect.top) / rect.height - 0.5

    const x = rx * target.width
    const y = ry * target.height

    return {
        x, y
    }
}