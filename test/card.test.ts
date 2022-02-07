import { Card, Model } from '../src'
import { Template } from '../src/card'

describe('main', () => {
    let card: Card
    let model
    test('card', () => {
        const name = String(Math.random())
        card = new Card(name)
        expect(card.name).toBe(name)
        expect(card.css).toBe('')
        expect(card.templates).toEqual([])

        const css = String(Math.random())
        card.setCss(css)
        expect(card.css).toBe(css)

        const templates: Template[] = [{ name: 'name', qfmt: 'qfmt', afmt: 'afmt' }]
        card.setTemplates(templates)
        expect(card.templates).toBe(templates)
    })

    test('model', () => {
        model = new Model('modelName', card)
    })
})

