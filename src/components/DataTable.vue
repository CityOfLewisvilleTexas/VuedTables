 <template>
<div>
    <DownloadButton :class="{ 'slide': filteredData.length === data.length, 'slide-left': filteredData.length !== data.length }" :jsonData="data" :color="'primary'" :title="title" :buttonText="'Download All Data \n'"/>
    <DownloadButton v-if="filteredData.length !== data.length" :color="'warning'" :jsonData="filteredData" :title="title" :buttonText="'Download Filtered Data'" />
    <div id="card">
        <table style="margin-top:50px;padding-top:80px;">
          <thead>
            <tr>
              <th v-for="(header, index) in headers" :key="index">
                <v-btn v-if="sort.key === header" 
                color="info" @click="sortData(header)">
                {{ prettyHeader(header) }}
                &nbsp;
                    <span v-if="sort.asc === true">
                      <v-icon>arrow_drop_up</v-icon>
                    </span>
                    <span v-if="sort.asc === false">
                      <v-icon>arrow_drop_down</v-icon>
                    </span>
                </v-btn>
                <v-btn v-else dark @click="sortData(header)">
                  {{ prettyHeader(header) }}
                </v-btn>
                <form>
                  <input type="text" style="display:none;" :value="header" />
                  <input :placeholder="'Filter'" class="form-control" @blur="blurOnFilterField" @keypress="keyPressOnFilterField" type="text"/>
                </form>
              </th>
            </tr>
            <tr v-for="(item, index) in filteredData" :key="index">
              <td v-for="(header, index) in headers" :key="index" 
              :class="{'none': item[header] === ''|| item[header] === 'NULL' || item[header] === null}">
                <div v-if="!isBase64(item[header]) && !isImageUrl(item[header]) && !isLink(item[header])">{{item[header] || 'NULL'}}</div> 
                <img v-if="isBase64(item[header])" class="img img-responsive" :src="'data:image/jpg;base64,' + item[header]"/>
                <img v-if="isImageUrl(item[header])" class="img img-responsive" :src="item[header]" />
                <a v-if="!isImageUrl(item[header]) && isLink(item[header])" :href="item[header]">{{item[header] || 'NULL'}}</a>
              </td>
            </tr>
          </thead>
        </table>
        <!-- <v-btn v-if="filters" id="clear-filters" color="error" @click="clearFilters">Clear Filters&nbsp;&nbsp;<v-icon>remove_circle</v-icon></v-btn> -->
    </div>
  </div>
</template>

<script>
import DownloadButton from './DownloadButton'
import moment from 'moment'

export default {
props: ['updateData', 'data', 'title', 'items'],
  components: {
    DownloadButton
  },
data() {
    return {
       filters: {},
       sort: {
         key: null,
         asc: null
       },
       imageFileExtensions: ['.jpg', '.png', '.tiff', '.gif', '.webp', '.bpg']
    }
},
    methods: {
        applyFilter(keyToFilter, value) {
          //debugger
          let filters = this.filters
          //a blank filter will exclude null values, so if the user gets rid of a filter, it removes altogether
          if (value !== '') {
            //need to use Vue.$set, as .push() or similar methods 
            //do not pass on Vue property prototypes, 
            //and therefore are not considered "reactive"
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
            const keyToFilter = e.target.form["0"].value
            const value = e.target.form["1"].value
            this.applyFilter(keyToFilter, value)
          }
        },
        sortData(key) {
          //debugger;
          let data = this.data
          let keyType = null
          for (var i = 0; i <= data.length; i++) {
            if(data[i][key] !== null) {
              keyType = typeof data[i][key]
              break
            }
          }
          if ((this.sort.key === key && !this.sort.asc) || this.sort.key !== key) {
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
          }
    },
    mounted() {
        },
    computed: {
        headers : function(){
          var headers = [];
          for (var k in this.data[0]){
              headers.push(k);
          }
          return headers;
        },
        rows() {
          let headers = this.headers
          let rows = this.data
            for(var item in rows) {
                for(var header in headers) {
                  return item[header]
                }
            }
        },
        filteredData() {
          let filteredData = this.data
          for (var key in this.filters) {
            filteredData = filteredData.filter( val => {
                return val[key].toString().toUpperCase().indexOf(this.filters[key].toUpperCase()) > -1
            })
          }
          return filteredData
        }
    },
    watch: {
        filters: function() {
         return this.filteredData
        }, 
        deep: true
      }
}
</script>

<style lang="css" scoped>
div, table {
    margin-bottom: 20px;
}
table, tr, td {
    margin-left: auto;
    margin-right: auto;
    padding: 12px;
}
th {
  padding-left:12px !important;
  padding-right: 12px !important;
}
input {
    margin-top:12px;
    outline: #999 1px;
    outline-color: #999;
    outline-style: auto;
    outline-width: 1px;
    padding:4px;
}
input:focus {
    outline: -webkit-focus-ring-color auto 1px;
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
    outline-width: 1px;
}
.none {
  background-color:#dddddd49 !important;
}
img {
    max-width: 165px;
}
#clear-filters {
  position:absolute;
  top:313px;
  right:140px;
}

div#div_downloadbuttons {
    text-align: center;
    left: 340px;
    top:130px;
}

tr, td {
  border:1px solid #dddddd;
}
th {
  border-left: 1px solid #dddddd;
  border-top: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  border-bottom: none;
  border-radius: 20px 20px 0 0;
  padding-bottom: 1px;
  margin-bottom: -5px;
}
tr:nth-child(even) {
  background-color:#F9F9F9;
}

table:nth-child(2) {
  display:none;
}
.slide {
    left: 38vw;
}

.slide-left {
  left:28vw;
}
</style>

