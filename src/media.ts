import CryptoJS from 'crypto-js'

export default class Media {
    public filename: string
    public data: string
    public base64 = false
    constructor (data: string, filename = '') {
        this.filename = filename
        this.data = data
    }
    setFilename (filename: string) {
        this.filename = filename
        return this
    }
    setBase64 (base64: boolean) {
        this.base64 = base64
        return this
    }
    get checksum () {
        return CryptoJS.MD5(this.data).toString(CryptoJS.enc.Hex)
    }
}
