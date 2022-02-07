import { Card, Deck, Field, Media, Model, Note, Package, Template, ModelKinds } from '../src'

// use describe for sequence
describe('main', () => {
    let card: Card
    let model: Model
    let note: Note
    let deck: Deck
    let media: Media
    const id = Date.now()
    const name = String(Math.random())
    const fieldsLength = Math.ceil(Math.random() * 10)

    describe('card', () => {
        card = new Card(name)
        expect(card.name).toBe(name)
        expect(card.css).toBe('')
        expect(card.templates).toEqual([])

        card.setCss()
        expect(card.css).toBe('')
        const css = String(Math.random())
        card.setCss(css)
        expect(card.css).toBe(css)

        card.setTemplates()
        expect(card.templates).toEqual([])
        const templates: Template[] = [{ name: 'name', qfmt: 'qfmt', afmt: 'afmt' }]
        card.setTemplates(templates)
        expect(card.templates).toBe(templates)
    })

    describe('field', () => {
        const field = new Field(name)
        expect(field.name).toBe(name)

        field.setFont()
        expect(field.font).toBe('Arial')
        field.setFont('sans-serif')
        expect(field.font).toBe('sans-serif')

        field.setOrd()
        expect(field.ord).toBe(0)
        field.setOrd(1)
        expect(field.ord).toBe(1)

        field.setSize()
        expect(field.size).toBe(12)
        field.setSize(20)
        expect(field.size).toBe(20)
    })

    describe('model', () => {
        model = new Model(name, card)
        expect(model.name).toBe(name)
        expect(model.fields).toEqual([])
        expect(model.card).toBe(card)

        model.setId(id)
        expect(id).toBe(id)

        model.setKind(ModelKinds.Close)
        expect(model.kind).toBe(ModelKinds.Close)

        const fields = Array.from({ length: fieldsLength })
            .map(() => (new Field(String(Math.random()))))
        model.setFields(fields)
        expect(model.fields).toBe(fields)

        model.setLatexPost('latexPost')
        expect(model.latexPost).toBe('latexPost')

        model.setLatexPre('latexpre')
        expect(model.latexPre).toBe('latexpre')

        model.setLatexsvg(true)
        expect(model.latexsvg).toBe(true)

        model.setRtl(true)
        expect(model.rtl).toBe(true)

        model.setSortIndex(2)
        expect(model.sortIndex).toBe(2)

        model.setSticky(true)
        expect(model.sticky).toBe(true)
    })

    describe('note', () => {
        note = new Note(model)
        expect(note.model).toBe(model)
        expect(note.fieldsValue).toEqual([])
        expect(note.tags).toEqual([])

        note.setId(id)
        expect(note.id).toBe(id)

        const arr = Array.from({ length: fieldsLength }).map((_, index) => `${index}`)

        note.setFieldsValue([])
        expect(note.fieldsValue).toEqual([])
        note.setFieldsValue(arr)
        expect(note.fieldsValue).toBe(arr)

        note.setTags([])
        expect(note.tags).toEqual([])
        note.setTags(arr)
        expect(note.tags).toBe(arr)
    })

    describe('deck', () => {
        deck = new Deck(name)
        expect(deck.name).toBe(name)

        deck.setId(id)
        expect(deck.id).toBe(id)

        deck.addNote(note)
        expect(deck.notes).toContain(note)
    })

    describe('media', () => {
        const data = Buffer.from('data')
        media = new Media(name, data)
        expect(media.filename).toBe(name)
        expect(media.data).toBe(data)
    })

    describe('package', () => {
        test('example', async () => {
            const pkg = new Package(deck, [ media ])
            const zip = await pkg.writeToFile()
            expect(zip).toBeInstanceOf(Buffer)
        })
    })
})

