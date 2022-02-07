import type Db from './database'
import type Model from './model'
import { ModelKinds } from './model'
export default class Note {
    public id: number
    public model: Model
    public fieldsValue: string[]
    public tags: string[]

    constructor (model: Model) {
        this.id = Date.now()
        this.fieldsValue = []
        this.tags = []
        this.model = model
    }

    setId (id: number) {
        this.id = id
        return this
    }

    setFieldsValue (fieldsValue: string[] = []) {
        this.fieldsValue = fieldsValue
        return this
    }

    setTags (tags: string[] = []) {
        this.tags = tags
        return this
    }

    fixDeprecatedBuiltinModelsAndWarn () {
        if (
            this.model.kind === ModelKinds.Close &&
            this.fieldsValue.length === 1
        ) {
            return [...this.fieldsValue, '']
        }
        return this.fieldsValue
    }

    checkNumberModelFieldsMatchesNumFields () {
        if (this.model.fields.length !== this.fieldsValue.length) {
            throw new Error(`
                length of fields in Model does not match length of fieldsValue in Note: ${this.model.name} has ${this.model.fields.length} fields, but note has ${this.fieldsValue.length} fieldsValue
            `)
        }
    }

    // checkInvalidHtmlTagsInFields () {
    //     if (this.fieldsValue.some(value => {

    //     }))
    // }

    writeToDatabase (db: Db, deckId: number) {
        this.fieldsValue = this.fixDeprecatedBuiltinModelsAndWarn()
        this.checkNumberModelFieldsMatchesNumFields()
        // this.checkInvalidHtmlTagsInFields()
        const timestamp = Date.now()
        const noteGuid = db.generateGuid(deckId)
        const id = db.getNoteId(noteGuid, this.id)
        db.update(
            'insert or replace into notes values(:id,:guid,:mid,:mod,:usn,:tags,:flds,:sfld,:csum,:flags,:data)',
            {
                ':id': id, // integer primary key,
                ':guid': noteGuid, // text not null,
                ':mid': this.model.id, // integer not null,
                ':mod': db.getId('notes', 'mod', timestamp), // integer not null,
                ':usn': -1, // integer not null,
                ':tags': ` ${this.tags.join(' ')} `, // text not null,
                ':flds': this.fieldsValue.join('\u001F'), // text not null, fields
                ':sfld': this.fieldsValue[0], // integer not null, sortField
                ':csum': 0, //integer not null,
                ':flags': 0, // integer not null,
                ':data': '', // text not null,
            }
        )
        this.model.card.writeToDatabase(db, deckId, id, timestamp)
    }
}
