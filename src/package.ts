import JSZip from 'jszip'
import initSqlJs from 'sql.js'
import Db from './database'
import type Deck from './deck'
import Media from './media'
import createTemplate from './template'

const isBrowser = process.env.APP_ENV === 'browser' || typeof window !== 'undefined'

export default class Package {
    public db!: Db
    public zip: JSZip
    public decks: Deck[] = []
    public medias: Media[]
    constructor (decks: Deck[] | Deck, medias: Media[] = []) {
        this.decks = this.decks.concat(decks)
        this.zip = new JSZip()
        this.medias = medias
    }

    private _initSql () {
        const config = isBrowser ? { locateFile: (filename: string) => `https://cdn.jsdelivr.net/npm/anki-apkg-generator/wasm/${filename}` } : undefined
        return initSqlJs(config).then(sql => {
            this.db = new Db(sql, createTemplate())
        })
    }

    private _writeToDatabase () {
        for (const deck of this.decks) {
            deck.writeToDatabase(this.db)
        }
    }

    async writeToFile (options?: any) {
        await this._initSql()
        const { zip, db, medias } = this
        this._writeToDatabase()
        const binaryArray = db.db.export()
        const mediaObj = medias.reduce((prev: any, curr, idx: number) => {
            prev[idx] = curr.filename
            return prev
        }, {})
        zip.file('collection.anki2', binaryArray)
        zip.file('media', JSON.stringify(mediaObj))

        medias.forEach((item, i) => zip.file(String(i), item.data))

        if (isBrowser) {
            return zip.generateAsync({ type: 'blob', ...options })
        } else {
            return zip.generateAsync({
                type: 'nodebuffer',
                base64: false,
                compression: 'DEFLATE',
                ...options,
            })
        }
    }
}
