import type Db from './database'

export interface Template {
    name: string
    // ord?: number
    qfmt: string
    afmt: string
    // bqfmt?: string
    // bafmt?: string
    // did?: number
    // bfont?: string
    // bsize: number
    // other?: any
}

export default class Card {
    css = ''
    templates: Template[] = []
    name: string
    constructor (name: string) {
        this.name = name
    }

    setCss (css = '') {
        this.css = css
        return this
    }

    setTemplates (templates: Template[] = []) {
        this.templates = templates
        return this
    }

    writeToDatabase (db: Db, deckId: number, noteId: number, timestamp: number) {
        db.update(
            'insert or replace into cards values(:id,:nid,:did,:ord,:mod,:usn,:type,:queue,:due,:ivl,:factor,:reps,:lapses,:left,:odue,:odid,:flags,:data)',
            {
                ':id': db.getCardId(noteId, timestamp), // integer primary key,
                ':nid': noteId, // integer not null, note_id
                ':did': deckId, // integer not null, deck_id
                ':ord': 0, // integer not null, template_idx
                ':mod': db.getId('cards', 'mod', timestamp), // integer not null, mtime_secs
                ':usn': -1, // integer not null,
                ':type': 0, // integer not null,
                ':queue': 0, // integer not null,
                ':due': 179, // integer not null,
                ':ivl': 0, // integer not null, interval
                ':factor': 0, // integer not null, ease_factor
                ':reps': 0, // integer not null,
                ':lapses': 0, // integer not null,
                ':left': 0, // integer not null, remaining_steps
                ':odue': 0, // integer not null, original_due
                ':odid': 0, // integer not null, original_deck_id
                ':flags': 0, // integer not null,
                ':data': '', // text not null
            }
        )
    }
}
