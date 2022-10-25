import createHash from 'create-hash'
import type { SqlJsStatic, Database, BindParams } from 'sql.js'

export default class Db {
    public db: Database
    constructor (sql: SqlJsStatic, template: string) {
        this.db = new sql.Database()
        this.db.run(template)
    }

    update (query: string, obj: BindParams) {
        this.db.prepare(query).getAsObject(obj)
    }

    getInitialRowValue (table: string, column = 'id') {
        const query = `select ${column} from ${table}`
        const result = this._getFirstVal(query)
        return result
    }

    getLastItem = (obj: any) => {
        const keys = Object.keys(obj)
        const lastKey = keys[keys.length - 1]
        return obj[lastKey]
    }

    private _getFirstVal (query: string) {
        return JSON.parse(this.db.exec(query)[0].values[0][0] as string)
    }

    getId (table: string, col: string, ts: number) {
        const query = `SELECT ${col} from ${table} WHERE ${col} >= :ts ORDER BY ${col} DESC LIMIT 1`
        const rowObj = this.db.prepare(query).getAsObject({ ':ts': ts })

        return rowObj[col] ? Number(rowObj[col]) + 1 : ts
    }

    getNoteId (guid: string, ts: number) {
        const query = 'SELECT id from notes WHERE guid = :guid ORDER BY id DESC LIMIT 1'
        const rowObj = this.db.prepare(query).getAsObject({ ':guid': guid })

        return Number(rowObj.id) || this.getId('notes', 'id', ts)
    }

    generateGuid (deckId: number, name: string) {
        return createHash('sha1').update(`${deckId}${name}`).digest('utf8')
    }

    getCardId (noteId: number, ts: number) {
        const query = 'SELECT id from cards WHERE nid = :note_id ORDER BY id DESC LIMIT 1'
        const rowObj = this.db
            .prepare(query)
            .getAsObject({ ':note_id': noteId })

        return Number(rowObj.id) || this.getId('cards', 'id', ts)
    }
}
