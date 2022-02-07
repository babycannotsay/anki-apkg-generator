import assert from 'assert'
import { it } from 'mocha'
import { Card } from '../src'
import { Template } from '../src/card'

it('card', () => {
    const name = String(Math.random())
    const card = new Card(name)
    assert.equal(card.name, name)
    assert.equal(card.css, '')
    assert.deepEqual(card.templates, ['a'])

    const css = String(Math.random())
    card.setCss(css)
    assert.equal(card.css, css)

    const templates: Template[] = [{ name: 'name', qfmt: 'qfmt', afmt: 'afmt' }]
    card.setTemplates(templates)
    assert.equal(card.templates, templates)
})
