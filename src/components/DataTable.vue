 <template>
    <div>
      <div>
        <!-- <h2>{{ parseInt(title) === 'NaN' ? '' : title }}</h2> -->
        <DownloadButton info :jsonData="data" :title="title" :buttonText="'Download All Data'"/>
      </div>
      <div>
        <DownloadButton info :jsonData="filteredData" :title="title" :buttonText="'Download Filtered Data'" />
        <table>
          <thead>
            <tr>
              <th v-for="header in headers">
                <v-btn primary @click="sortData(header)">{{ header }}</v-btn>
                <form>
                  <input type="text" style="display:none;" :value="header" />
                  <input :placeholder="'Filter'" class="form-control" @blur="blurOnFilterField" @keypress="keyPressOnFilterField" type="text"/>
                </form>
              </th>
            </tr>
            <tr v-for="item in data">
              <td v-for="header in headers">{{item[header]}}</td>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
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
       } 
    }
},
    computed: {
        
    },
    methods: {
        applyFilter(keyToFilter, value) {
          let filters = this.filters
          //a blank filter will exclude null values, so if the user gets rid of a filter, it removes altogether
          if (value !== '') {
            filters[keyToFilter] = value
          }
          else {
            delete filters[keysToFilter]
            this.filters = filters
          }
        },
        blurOnFilterField(e) {
          console.log(e.target.form["0"].value)
          console.log(this.filters, this.filteredData)
          const keyToFilter = e.target.form["0"].value
          const value = e.target.form["1"].value
          this.applyFilter(keyToFilter, value)
        },
        keyPressOnFilterField(e) {
          //user pressed "enter"
          if (e.keycode === 13) {
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
        filteredData() {
          let filteredData = this.data
          for (var key in this.filters) {
            filteredData = filteredData.filter( val => {
              try {
                return val[key].toString().toUpperCase.indexOf(this.filters[key].toUpperCase()) > -1
              }
              catch(err) {
                return false
              }
            })
          }
        },

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
#app > div > main > div > div > div > div > div > div > div:nth-child(5),
 #app > div > main > div > div > div > div > div > div > div:nth-child(5) > * {
    display: none !important;
}
</style>

