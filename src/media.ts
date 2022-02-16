import createHash from 'create-hash'

export default class Media {
    public filename: string
    public data: ArrayBuffer
    constructor (data: ArrayBuffer, filename = '') {
        this.filename = filename
        this.data = data
    }
    setFilename (filename: string) {
        this.filename = filename
        return this
    }
    get checksum () {
        const enc = new TextDecoder('utf-8')
        return createHash('md5').update(enc.decode(this.data)).digest('hex')
    }
}
