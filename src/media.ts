export default class Media {
    public filename: string
    public data: Buffer
    constructor (filename: string, data: Buffer) {
        this.filename = filename
        this.data = data
    }
}
