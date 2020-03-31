<template>
    <v-layout row wrap>
    <v-btn class="button-docked">add filter &#43;</v-btn>
    <DownloadButton :class="{ 'slide': filteredData.length === data.length, 'slide-left': filteredData.length !== data.length }" :jsonData="data" :color="'primary'" :title="title" :buttonText="'Download All Data \n'"/>
    <DownloadButton v-if="filteredData.length !== data.length" :color="'warning'" :jsonData="filteredData" :title="title" :buttonText="'Download Filtered Data'" />
    <v-data-table
      :headers="headers"
      :items="filteredData"
      class="elevation-1"
      :search="search"
      :pagination.sync="pagination"
      dark
    >
    <template slot="headers" slot-scope="props">
        <th v-for="(header, index) in props.headers" :key="index"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click.self="changeSort(header.value)">
             {{ prettyHeader(header.text) }}
          <v-icon small>arrow_upward</v-icon>
                <form @click.stop="changeSort">
                  <input type="text" style="display:none;" :value="header.text" />
                  <v-text-field :placeholder="'Filter'" class="form-control" @blur="blurOnFilterField" @keypress="keyPressOnFilterField" type="text"></v-text-field>
                </form>
        </th>
    </template>
      <template slot="items" slot-scope="props">
        <td v-for="(header, index) in headers" :key="index">
            {{ props.item[header.value] }}
        </td>
      </template>
    </v-data-table>
    </v-layout>
</template>

<script>
import DownloadButton from './DownloadButton'
import moment from 'moment'

export default {
    name: 'VueDataTable',
    props: ['updateData', 'data', 'title', 'datakey'],
    components: {
        DownloadButton
    },
    data() {
        return {
            items: [],
            search: '',
            filters: {},
            pagination: {
                sortBy: this.headers,
                desc: null,
                asc: null
            },
            imageFileExtensions: ['.jpg', '.png', '.tiff', '.gif', '.webp', '.bpg']
                }
    },
    mounted() {
    },
    watch: {
    filters: function() {
        return this.filteredData
    },
    deep: true
    },
    methods: {
        changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
            }
        },
         applyFilter(keyToFilter, value) {
          let filters = this.filters
          if (value !== '') {
            this.$set(this.filters, keyToFilter, value)
          }
          else {
            this.$delete(this.filters, keyToFilter)
          }
        },

        blurOnFilterField(e) {
          const keyToFilter = e.target.form["0"].value
          const value = e.target.form["1"].value
          this.applyFilter(keyToFilter, value)
        },

        keyPressOnFilterField(e) {
          //user pressed "enter"
          if (e.keyCode === 13) {
              e.preventDefault()
            const keyToFilter = e.target.form["0"].value
            const value = e.target.form["1"].value
            this.applyFilter(keyToFilter, value)
          }
        },

        sortData(key) {
          let data = this.data
          let keyType = null
          for (var i = 0; i <= data.length; i++) {
            if(data[i][key] !== null) {
              keyType = typeof data[i][key]
              break
            }
          }
          if ((this.sort.key === key && !this.sort.asc) || this.sort.key !== key) {
              console.log('asc', this.sort.asc, 'desc', this.sort.desc)
            data = data.sort( (a, b) => {
              //sort asc
              if (keyType === 'number') {
                return a[key] - b[key]
              }
              else if(keyType === 'string') {
                let c = a[key] || ''
                let d = b[key] || ''
                c = c.toUpperCase()
                d = d.toUpperCase()
                if (c.substring(0,1) === '$') {
                  const cMoney = parseFloat(c.substring(1).replace(/,/g, ''))
                  const dMoney = parseFloat(d.substring(1).replace(/,/g, ''))
                  return cMoney - dMoney              
                }
                else {
                  const cDate = new moment(c)
                  const dDate = new moment(d)
                  if (cDate._isValid || dDate._isValid) {
                    if (cDate.isBefore(dDate)) {
                      return -1
                    }
                    else if (cDate.isAfter(dDate)) {
                      return 1
                    }
                    else {
                      return 0
                    }
                  }
                  else {
                    if (c < d) {
                      return -1
                    }
                    else if (c > d) {
                      return 1
                    }
                    else {
                      return 0
                    }
                  }
                }
              }
            })
          }
          else {
            data = data.sort( (a,b) => {
              if (keyType === 'number') {
                return b[key] - a[key]
              }
              else if (keyType === 'string') {
                let c = a[key] || ''
                let d = b[key] || ''
                if(c.substring(0,1) === '$') {
                  const cMoney = parseFloat(c.substring(1).replace(/,/g, ''))
                  const dMoney = parseFloat(d.substring(1).replace(/,/g, '')) 
                  return dMoney - cMoney                 
                }
                else {
                  const cDate = new moment(c)
                  const dDate = new moment(d)
                  if (cDate._isValid || dDate._isValid) {
                    if (dDate.isBefore(cDate)) {
                      return -1
                    }
                    else if (dDate.isAfter(cDate)) {
                      return 1
                    }
                    else {
                      return 0
                    }
                  }
                  else {
                    if (c > d) {
                      return -1
                    }
                    else if (c < d) {
                      return 1
                    }
                    else {
                      return 0
                    }
                  }
                }
              }
            })
          }
          if (this.sort.key === key) {
            this.sort.key = key
            this.sort.asc = !this.sort.asc
          }
          else {
            this.sort.key = key
            this.sort.asc = true
          }
          this.updateData(this.title, data)
        },
         mappedData(obj) {
          return obj.map( (item, i) => item)
        },
          isBase64(val) {
            if(typeof val !== 'string') {
              return false
            } else if (val.substring(0,4) === '/9j/') {
              return true
            } else {
              return false
            }
          },
          formatHeaderforImgKey(header) {
            if(header.substring(0,9) === 'AT_IMAGE_') {
              return header.replace(/AT_IMAGE_/, '')
            } else {
              return header
            }
          },
          isImageUrl(val) {
            if (typeof val !== 'string') {
              return false
            } else if(val.substring(0,4) === 'http' && this.imageFileExtensions.indexOf(val.substring(val.length - 4).toLowerCase()) > -1) {
              return true
            } else {
              return false
            }
          },
          isLink(val) {
            if(typeof val !== 'string') {
              return false
            } else if (val.substring(0,4) === 'http') {
              return true
            } else {
              return false
            }
          },
          prettyHeader(val) {
            return val.replace(/_/, ' ')
          },
          clearFilters() {
            this.filters = {}
          },

      filterSearch(val) {
        this.filters = this.$MultiFilters.updateFilters(this.filters, {search: val});
      },
    },
    computed: {
        headers() {
            let scopedKeys = []
            let _set = new Set()
            let dataKeys = Object.keys(this.data[0])
                dataKeys.map(key => {
                      scopedKeys
                      .push({
                        text: key,
                        align: 'start',
                        value: key,
                        filterable:true,
                        divider:true
                        })
                })
            scopedKeys.map(k => _set.add(k))
            return [..._set]
         },

         filteredData() {
          let filteredData = this.data
          for (var key in this.filters) {
            filteredData = filteredData.filter( val => {
                return val[key].toString().toUpperCase().indexOf(this.filters[key].toUpperCase()) > -1
            })
          }
          return filteredData
        },
    }
}
</script>

<style lang="scss" scoped>
.search {
    padding: 20px;
}
.filter {
    position: absolute;
    width: 50vw;
}
.v-text-field__slot > * {
    color: white !important;
}
i.v-icon.material-icons.theme--light {
    color: white;
}
.elevation-1 {
    margin-top: 70px;
}
.v-datatable__actions__range-controls {
    display:flex;
}
.v-datatable__actions__select {
    flex:0;
}
.theme--dark.v-datatable .v-datatable__actions {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    flex-direction: row-reverse;
    font-size: 12px;
    -ms-flex-wrap: wrap-reverse;
    flex-wrap: wrap-reverse;
}
.theme--dark.v-datatable .v-datatable__actions {
    display:flex;
    flex-direction:row-reverse;
    margin-top: 56px !important;
}

.layout.wrap {
    background: #424242;
}
.v-content__wrap {
    background: #424242;
}
.slide {
    left: 32vw;
}
.slide-left {
  right:190px;
}
button.button-docked.v-btn.theme--light {
    position: absolute;
    right: -22px;
    clip: rect(0px,156px,183px,106px);
    border-radius: 15px;
    border:.5px solid #999;
    transition:.3s;
}
button.button-docked.v-btn.theme--light:hover {
    transition:.5s;
    clip: rect(0px,156px,83px,0px)
}
</style> 