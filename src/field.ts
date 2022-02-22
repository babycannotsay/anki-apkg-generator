export default class Field {
    public ord? = 0
    public name: string
    public font? = 'Arial'
    public size? = 12

    constructor (name = '') {
        this.name = name
    }

    setOrd (ord = 0) {
        this.ord = ord
        return this
    }
    setFont (font = 'Arial') {
        this.font = font
        return this
    }

    setSize (size = 12) {
        this.size = size
        return this
    }
}
