import type Card from './card'
import type Field from './field'

export enum ModelKinds {
    Standard,
    Close,
}

export default class Model {
    public id: number
    public name: string
    public sticky = false
    public rtl = false
    public fields: Field[]
    public sortIndex = 0
    public kind: ModelKinds = ModelKinds.Standard
    public card: Card
    public latexPre =
        '\\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage[utf8]{inputenc}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}\n'
    public latexPost = '\\end{document}'
    public latexsvg = false

    constructor (name: string, card: Card) {
        this.fields = []
        this.id = Date.now()
        this.name = name
        this.card = card
    }

    setFields (fields: Field[]) {
        this.fields = fields
        return this
    }

    setSortIndex (index: number) {
        this.sortIndex = index
        return this
    }

    setRtl (rtl: boolean) {
        this.rtl = rtl
        return this
    }

    setSticky (sticky: boolean) {
        this.sticky = sticky
        return this
    }

    setLatexPre (latexPre: string) {
        this.latexPre = latexPre
        return this
    }

    setLatexPost (latexPost: string) {
        this.latexPost = latexPost
        return this
    }

    setLatexsvg (latexsvg: boolean) {
        this.latexsvg = latexsvg
        return this
    }

    setKind (type: ModelKinds) {
        this.kind = type
        return this
    }

    toJSON (deckId: number) {
        return {
            id: this.id,
            name: this.name,
            did: deckId,
            type: this.kind,
            mod: Date.now(),
            usn: -1,
            flds: this.fields.map((field, index) => ({
                ...field,
                sticky: index === 1,
                rtl: this.rtl,
                // other: null // @TODO what's meaning?
            })),
            sortf: this.sortIndex, // 排序fields index
            tmpls: this.card.templates,
            css: this.card.css,
            latexPre: this.latexPre,
            latexPost: this.latexPost,
            latexsvg: this.latexsvg, // 用dvisvgm创建可缩放的图片
        }
    }
}
