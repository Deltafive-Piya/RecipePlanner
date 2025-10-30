export const setDragData = (e: DragEvent, data: string): void => {
    if (e.dataTransfer) {
        e.dataTransfer.setData('application/json', data)
    }
}

export const getDragData = <T>(e: DragEvent): T | null => {
    const raw = e.dataTransfer?.getData('application/json')
    if (!raw) return null
    try {
        return JSON.parse(raw) as T
    } catch {
        return null
    }
}