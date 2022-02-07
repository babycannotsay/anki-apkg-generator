import fs from 'fs'
import { Package, Deck, Note, Model, Field, Card } from '../src/index'

async function test () {
    const fields = [
        { name: 'Answer' },
        { name: 'Question' },
        { name: 'MyMedia' },
    ]

    const card = new Card('cardName')
    card.setCss().setTemplates([
        {
            name: 'Card 1',
            qfmt: '{{Question}}<br>{{MyMedia}}',
            afmt: '{{FrontSide}}<hr id="answer">{{Answer}}',
        },
    ])

    const model = new Model('modelName', card)

    model
        .setSticky(true)
        .setFields(fields.map((f, index) => new Field(f.name).setOrd(index)))

    const note = new Note(model)
    note
        .setFieldsValue([
            'Capital of Argentina',
            'Buenos Aires',
            'media',
        ])
        .setTags(['q', 'z'])

    const deck = new Deck('deckName')
    deck.addNote(note)
    const pkg = new Package(deck)
    const zip: any = await pkg.writeToFile()
    const target = './test.apkg'
    fs.writeFileSync(target, zip, 'binary')

    console.log('success')
}
test()
