import { css, html, unsafeCSS, styleMap, PropertyValueMap, ref, createRef, Ref } from '@others-ui/common'
import { property, state } from '@others-ui/common'
import { BaseElement } from '@others-ui/common'
import { ifDefined } from '@others-ui/common'
import styles from './styles/select.scss'
import { watch } from '../../utils/watch'

export interface SelectOptions {
  label?: string,
  value: string
}

export interface SelectProps {
  options: SelectOptions[]
  value?: string
}

export class Select extends BaseElement implements SelectProps {
  static componentName: string = 'select'
  static styles = css`${unsafeCSS(styles)}`
  static expressionProperties: string[] = ['options']

  @property({type: Array})
  public options: SelectProps['options'] = []

  @property({type: String})
  public value?: string

  @state()
  private _value?: string

  @state()
  private label?: string

  @state()
  private styles_css_variable

  rootRef?: Ref<HTMLDivElement> = createRef<HTMLDivElement>()

  constructor() {
    super()
    this.styles_css_variable = {
      '--others-ui-scope-select-list-height': '0'
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.styles_css_variable['--others-ui-scope-select-list-height']= `${this.options.length * 30}px`
  }

  onItemClick(option: SelectOptions) {
    this.label = option.label ?? option.value
    this._value = option.value
    this.emit('change', this._value)
    this.styles_css_variable = {
      ...this.styles_css_variable,
      '--others-ui-scope-select-list-height': '0'
    }

    setTimeout(() => {
      this.styles_css_variable['--others-ui-scope-select-list-height'] = `${this.options.length * 30}px`
      console.log('this.rootRef?.value', this.rootRef?.value)
      if (this.rootRef?.value) {
        this.rootRef.value.style.setProperty('--others-ui-scope-select-list-height', `${this.options.length * 30}px`)
      }

    }, 300)
  }

  protected willUpdate(state: PropertyValueMap<SelectOptions>) {
    watch(state, {
      value: (val) => this._value = val
    })
  }

  render() {
    return html`
    <div
      class="select"
      style=${styleMap(this.styles_css_variable)}
      ${ref(this.rootRef)}
    >
      <div class="select-active-label">
        ${ifDefined(this.label)}
      </div>
      <div class="select-list">
        <ul class="select-list-box">
          ${this.options.map((option) => renderSelectItem.call(this, option))}
        </ul>
      </div>
    </div>
    `
  }
}

function renderSelectItem(this: Select, option: SelectOptions) {
  return  html`<li @click=${() => this.onItemClick(option)}>${option.label ?? option.value}</li>`
}
