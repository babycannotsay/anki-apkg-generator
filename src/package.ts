import Zip from 'jszip'
import initSqlJs from 'sql.js'
import Db from './database'
import type Deck from './deck'
import Media from './media'
import createTemplate from './template'

export default class Package {
    public db!: Db
    public zip: Zip
    public decks: Deck[] = []
    public medias: Media[]
    constructor (decks: Deck[] | Deck, medias: Media[] = []) {
        this.decks = this.decks.concat(decks)
        this.zip = new Zip()
        this.medias = medias
    }

    private _initSql () {
        return initSqlJs().then(sql => {
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
        zip.file('collection.anki2', Buffer.from(binaryArray))
        zip.file('media', JSON.stringify(mediaObj))

        medias.forEach((item, i) => zip.file(String(i), item.data, { base64: item.base64 }))

        if (
            process.env.APP_ENV === 'browser' ||
            typeof window !== 'undefined'
        ) {
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
