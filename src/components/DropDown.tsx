import { defineComponent,ref, PropType, watch, computed, onMounted} from 'vue';
import {anyObj,SelectMtype} from '../types/types';
import '../styles/dropdown.scss';
import Tooltip from './Tooltip';
import Searchpopup from './Search';




const Dropdown = defineComponent({

    props: {
        itemList: {
          type: Array
        },
        placeholder: {
          type: String,
          default: () => ''
        },
        selected: {
          type: [Number, String],
          default: null
        },
        mSelectProperty: {
          type: [Object, Array, String]
          // Object as PropType<SelectMtype[]>
        },
        resetDropdown: {
          type: [Object, Number, String, Boolean],
          default: false
        },
        isSearch: {
          type: Boolean,
          default: false
        },
        isImage: {
          type: Boolean,
          default: false
        },
        isVideo: {
          type: Boolean,
          default: false
        },
        id: {
    
        },
        maxInput: {
          type: [Number],
          default: false
        },
        searchType: {
          type: [String]
        }
    },
    emits:['on-video-click', 'itemSelected', 'searchcb', 'on-item-reset'],

    data () {
        return {
          inputValue: '',
          showList: false,
          selectedItem: {} as anyObj,
          resetItem: {} as anyObj,
          selectProperty: {} as anyObj,
          placeholderText: '',
          listHovering: false,
          hoverIndex: null  ,
          mousedown: true,
          finalListItem: [],
          searchQuery: '',
          isSingleItem: true,
          flag: true
        }
    },


    computed: {
        cssVarsDefault () {
          return this.selectProperty.defaultProperty
        },
        cssVarsList () {
          return this.selectProperty.listProperty
        },
        cssVariable () {
          return {
            'width': this.selectProperty.defaultProperty.width
            // '--width': this.selectProperty.defaultProperty.width
          }
        },
        inputVars () {
          this.setStyles()
          let styleProp = {
            width: parseInt(this.selectProperty.defaultProperty.width, 10) + 'px'
          }
          return {...this.selectProperty.inputProperty, ...styleProp}
        },
        getSelectedName () {
          let val = ''
          if (this.selectedItem.name) {
            if (this.selectedItem.name.includes('#')) {
              val = this.selectedItem.name.split('#')[0]
            } else {
              val = this.selectedItem.name
            }
          } else if (this.resetItem.name) {
            if (this.resetItem.name.includes('#')) {
              val = this.resetItem.name.split('#')[0]
            } else {
              val = this.resetItem.name
            }
          }
          return val
        },
        getMouseLeave() {
          return false
        },
        getMouseHover () {
          return true
        },
        getLength () {
          return Object.keys(this.selectedItem).length === 0
        },
        getVisibleItem () {
          let val = false
          if (this.inputValue !== '') {
            this.itemList?.forEach((item:any)=>{
              let currentName = item.name.toLowerCase()
              let currentInput = this.inputValue.toLowerCase()
              let myPattern = new RegExp('(\\w*'+currentInput+'\\w*)','gi')
              let matches = currentName.match(myPattern)
              if (matches) {
                val = true
              }
            })
          } else {
            val = true
          }
          return val
        }
      },

    created () {
        this.selectProperty = {
          defaultProperty: {
            width: '190px',
            fontSize: '14px',
            lineHeight: '17px',
            color: '#1F2631'
          },
          inputProperty: {
            background: '#fff',
            height: '30px',
            borderRadius: '3px',
            border: '1px solid #D4DAE4'
          },
          listProperty: {
            borderRadius: '3px'
          },
          selectedProperty: {
            color: '#0978FC'
          },
          hoverProperty: {
            background: '#F9F9F9',
            letterSpacing: '0.5px'
          },
          unSelectedProperty: {
            background: '#fff',
            height: '32px'
          }
        }
        this.placeholderText = this.placeholder
        if (this.selected) {
          this.flag = false
          this.selectItem(this.itemList?.find((i:any) => i.id === this.selected))
        }
    },

    mounted () {
        this.setStyles();
        window.addEventListener('click', this.close)
    },

    watch: {
      resetItem: {
        deep: true,
        handler () {
          this.selectedItem = this.resetItem
        }
      },
      inputValue () {
        this.getVisibleItem
      },
      itemList() {
  
      },
      resetDropdown () {
        this.flag = false
        if (this.resetDropdown || this.resetDropdown === 0) {
          if (this.itemList?.find((i:any) => i.id === this.resetDropdown)) {
            this.selectItem(this.itemList?.find((i:any) => i.id === this.resetDropdown))
          } else {
            this.$emit('itemSelected', {})
            this.selectedItem = {}
            if (!this.isImage) {
              this.placeholderText = this.placeholder
            }
            if (this.isSearch) {
              this.searchQuery = ''
              this.$emit('searchcb', this.searchQuery)
            }
          }
        } else if (this.resetDropdown === false) {
          return
        }
      },

      mSelectProperty: {
        deep: true,
        handler () {
          this.setStyles()
        }
      }
    },

    methods:{

      itemVisible (item:any) {
        if (this.inputValue === '') {
          return true
        } else {
          let currentName = item.name.toLowerCase()
          let currentInput = this.inputValue.toLowerCase()
          return currentName.includes(currentInput)
        }
      },
      getName (name:any) {
        let value = []
        let isHash = name.includes('#')
        this.isSingleItem = !isHash
        if (isHash) {
          value = name.split('#')
        } else {
          value.push(name)
        }
        return value
      },
      setStyles () {
        if (this.mSelectProperty) {
          let propMselect = JSON.parse(JSON.stringify(this.mSelectProperty))
        if (this.mSelectProperty ) {
          let defaultProp = {...this.selectProperty.defaultProperty, ...propMselect.defaultProperty}
          this.selectProperty.defaultProperty = defaultProp
        }
        if (propMselect.inputProperty) {
          let inputProp = { ...this.selectProperty.inputProperty, ...propMselect.inputProperty}
          this.selectProperty.inputProperty = inputProp
        }
        if (propMselect.selectedProperty ) {
          let selectProp = { ...this.selectProperty.selectedProperty, ...propMselect.selectedProperty}
          this.selectProperty.selectedProperty = selectProp
        }
        if (propMselect.hoverProperty ) {
          let hoverProp = { ...this.selectProperty.hoverProperty, ...propMselect.hoverProperty}
          this.selectProperty.hoverProperty = hoverProp
        }
        if (propMselect.unSelectedProperty ) {
          let selectProp = { ...this.selectProperty.unSelectedProperty, ...propMselect.unSelectedProperty}
          this.selectProperty.unSelectedProperty = selectProp
        }
        if (propMselect.listProperty ) {
          let selectProp = { ...this.selectProperty.listProperty, ...propMselect.listProperty}
          this.selectProperty.listProperty = selectProp
        }
      }
      },
      getUrl (item:any) {
        if (item.url) {
          return item.url
        }
      },
      getClickEvent (data:any) {
        this.$emit('on-video-click', data)
      },
      changeDefaultValue (data:any) {
        if (this.flag) {
          if (!data) {
            this.showList = false
          } else {
            this.showList = true
          }
        }
        this.searchQuery = data
        this.flag = true
        this.$emit('searchcb', data)
      },
      getClass (item:any) {
        // let val = ''
        // if (item.name.includes('#')) {
        //   val = item.name.split('#')[0]
        // } else {
        //   val = item.name
        // }
        if (item.id == this.selectedItem.id) {
          return true
        } else {
          return false
        }
      },
      onMousedown() {
        this.mousedown = true
      },
      onMouseUp() {
        this.mousedown = false
      },
      getStyle(val:any, index:any) {
        let styl = ''
        if (this.listHovering) {
          if (this.hoverIndex === index) {
            styl = {...this.selectProperty.unSelectedProperty, ...this.selectProperty.hoverProperty}
          } else {
            styl = this.selectProperty.unSelectedProperty
          }
          if (val && !this.hoverIndex === index) {
            styl = this.selectProperty.unSelectedProperty
          }
        } else if (val) {
          styl = {...this.selectProperty.unSelectedProperty, ...this.selectProperty.selectedProperty}
        } else {
          styl = this.selectProperty.unSelectedProperty
        }
        return styl
      },
      showDrop (){
        this.showClick()
        this.stopClose()
      },
      selectItem (theItem:any) {
        this.selectedItem = theItem
        if (this.selectedItem.name && !this.isImage) {
          this.placeholderText = this.getSelectedName
        }
        this.inputValue = ''
        if (this.isSearch) {
          this.searchQuery = this.getSelectedName
          this.$emit('searchcb', this.searchQuery)
        }
        this.$emit('itemSelected', theItem)
        this.getClass(theItem)
      },
      resetSelection () {
        if (!this.isSearch) {
          if (this.selectedItem.name) {
            this.placeholderText = this.getSelectedName
          }
          this.resetItem = this.selectedItem
          this.selectedItem = {}
          // this.$nextTick( () => this.$refs.dropdowninput.focus() )
          this.$emit('on-item-reset', this.resetItem)
        } else {
          this.stopClose()
          this.placeholderText = ''
          this.selectedItem = {}
          this.resetItem = this.selectedItem
          this.$emit('on-item-reset', this.resetItem)
        }
      },
      stopClose () {
      //  event.stopPropagation()
      //  this.showList = false
       setTimeout(() => {
          // this.showList = false
          this.showList = !this.showList
       }, 100)
      },
      showClick () {
        // this.showList = !this.showList
      },
      showBlur () {
        //  this.showList = false
        this.showList = !this.showList
      },
      close (e:any) {
        //console.log(document.getElementById(this.ida))
        //   this.showList = false
        if (!this.$el.contains(e.target)) {
          this.showList = false
        } else {
          this.showList = !this.showList      
      }
      }


    },

    

    render(){

        return (
           <div class="m-dropdown" onClick={this.showBlur} style={this.cssVarsDefault}>
              <div class="md__input" style={this.cssVariable}>
                {this.selectedItem.url ?
                   <div class="selected-image" onClick={() => this.getClickEvent(this.selectedItem)}>
                     <img v-show="isImage" src={this.getUrl(this.selectedItem)} title={this.selectedItem.name} class="list-image"/>
                     <img v-show="isVideo"  src={require('../assets/video/playbutton.png')} class="vid" />
                       <Tooltip class="md__input__selected" title={this.selectItem.name} value="1"/>
                    </div>
                   : null }

                <div class="md__input-box" onClick={this.stopClose}>
                  <slot name= "search">
                    {!this.isSearch ?
                     <div class="md__input-div">
                       {this.showList || this.isImage ? 
                         <input maxlength= {this.maxInput} type= {this.searchType} style={this.inputVars} class="md__search"  ref="dropdowninput"  placeholder={this.placeholderText} onClick ={this.showClick} /> 
                       : <input maxlength= {this.maxInput} type= {this.searchType} style={this.inputVars}  onClick={this.resetSelection} class="dropdown-selected" ref="dropdowninput" value={this.getSelectedName}  placeholder={this.placeholderText} disabled/>
                       }
                     </div>:
                     <div class="md__input-div">
                       <div style = {this.inputVars}>
                         <div class="multi">
                         <span class="placeholder-text">
                           {/* <Searchpopup searchClick={this.showClick()} class="popup-dropdown" show="true" searchEvent={this.changeDefaultValue(event)} query={this.searchQuery} searchLabel="placeholder || ''" />  */}
                           </span>
                         </div>
                       </div>
                     </div>
                     }
                  </slot>
                   <div class="md__arrow">
                   <slot name = "arrow">
                     <svg class={this.showList ? 'arrow__up': 'arrow__down'} width="8px" height="5px" viewBox="0 0 32 20" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                          <title></title>
                          <desc>Created with sketchtool.</desc>
                         <g id="Components" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Place-holders" transform="translate(-158.000000, -139.000000)" fill="#A7B1C6">
                             <path d="M173.822147,158.422246 C173.245796,158.409504 172.667443,158.226091 172.167037,157.859651 C172.048839,157.773096 171.937335,157.677754 171.833472,157.574433 L158.850427,144.659195 C157.715241,143.520375 157.716713,141.677381 158.853718,140.540377 L158.964106,140.429989 C160.102396,139.291698 161.947929,139.291698 163.08622,140.429989 L173.993671,151.33744 L184.916888,140.414224 C186.055178,139.275933 187.900712,139.275933 189.039002,140.414224 L189.1461,140.521321 C190.284599,141.659403 190.284599,143.504936 189.146308,144.643227 L176.200548,157.586013 C175.550516,158.235896 174.669939,158.514631 173.822147,158.422246 L173.822147,158.422246 Z" id="Path"></path>
                            </g>
                         </g>
                      </svg>
                    </slot>
                  </div>
                </div>
              </div>
              <div class="md__list" onMouseover={() => this.listHovering = true} v-show={this.showList} onMouseleave={() => this.listHovering = false}  onClick={this.showBlur} style={this.cssVarsList}>
                 {this.itemList?.map((item,index)=>(
                   <div>
                     <div onClick={() => this.selectItem(item)}  v-show= {this.itemVisible(item)}  onMouseleave={() => this.hoverIndex = null} key="item.name" class={['md__list__item', this.isImage && !this.isVideo ? 'image_list_item': '', this.getClass(item) ? 'active' :'inactive'] } style={this.getStyle(this.getClass(item),index)}>
                     <img v-show={this.isImage && !this.isVideo} src={this.getUrl(item)}  class="list-image"/>
                        {JSON.parse(JSON.stringify(item)).name ? 
                          <span class="item-name">
                            {this.getName(JSON.parse(JSON.stringify(item)).name).map((i:any)=>(
                              <span title={this.getName(JSON.parse(JSON.stringify(item)).name).join('  ')}>{i}</span>
                            ))}
                          </span>
                        :null}
                    </div>
                   </div>
                 ))}   
              </div>

           </div>
        ) ;
    }
})


export default Dropdown ;




