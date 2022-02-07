import type Db from './database'
import type Note from './note'

export default class Deck {
    public id: number
    public name: string
    public description?: string
    public notes: Note[]
    constructor (name: string, description = '') {
        this.name = name
        this.description = description
        this.id = Date.now()
        this.notes = []
    }

    addNote (note: Note) {
        this.notes.push(note)
        return this
    }

    writeToDatabase (db: Db) {
        const { id, description, name } = this
        const topDeckId = db.getId('cards', 'did', id)
        const decks = db.getInitialRowValue('col', 'decks')
        const deck = db.getLastItem(decks)
        deck.name = name
        deck.id = topDeckId
        deck.desc = description
        decks[`${topDeckId}`] = deck
        db.update('update col set decks=:decks where id=1', {
            ':decks': JSON.stringify(decks),
        })

        const models = db.getInitialRowValue('col', 'models')

        this.notes.forEach((n) => {
            models[n.model.id] = n.model.toJSON(id)
            n.writeToDatabase(db, id)
        })
        db.update('update col set models=:models where id=1', {
            ':models': JSON.stringify(models),
        })
    }
}
