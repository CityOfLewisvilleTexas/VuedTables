<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Auto</span>
        <span class="font-weight-light">TABLES</span>
		<span style="position:absolute;right:20px;top:12px;letter-spacing:1.2px;font-size:1.3rem;font-weight:bold;">
			{{ cleanWebserviceName }}<br/>
			<span id="paramval" v-if="parameters.length && showingResultsFor !== ''">{{ showingResultsFor }}</span>
		</span>

	  </v-toolbar-title>
    </v-toolbar>

    <v-content>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <div v-if="dataIsLoading">
            <Loader></Loader>
			<!-- <form class="form-inline">
				<span v-for="(param, i) in parameters" :key="i">
					<Parameters :parameters="parameters" @selectedParams="updateSelectedParams" :updateParameterValue="updateParameterValue"/>
				</span>
			</form> -->
          </div>
          <v-card v-else class="table-container">
			<Parameters :parameters="parameters" @selectedParams="updateSelectedParams" :updateParameterValue="updateParameterValue"/>
				<div  id="wrapper2" v-for="(key, i) in dataKeys" :key="i">
					<VueDataTable :updateData="updateData" :data="data[key]" :title="cleanWebserviceName"/>
					<!-- <DataTable :updateData="updateData" :data="data[key]" :title="cleanWebserviceName"/>  -->
				</div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    </v-content>
  </v-app>
</template>

<script>
import qs from 'qs'
import Loader from './components/Loader'
import ParameterInput from './components/ParameterInput'
import DataTable from './components/DataTable'
import Parameters from './components/Parameters'
import VueDataTable from './components/VueDataTable'

export default {
	/* es-lint disable */
	//prettier-ignore
  name: 'App',
  components: {
    Loader,
    ParameterInput,
	DataTable,
	Parameters,
	VueDataTable
  },
  data () {
    return {
      data: [],
      dataIsLoading: false,
      webserviceName: '',
	  parameters: [],
	  selectedParams: [],
	  parametersLoaded: false,
	 showingResultsFor: '',
      sort: {
        key: null,
        asc: null
      }
    }
  },
  methods: {
	updateSelectedParams: function(payload){
		this.selectedParams = payload
	},
    initializeWebserviceInfo() {
		var urlQuery = {}
		if (window.location.search !== '') {
			window.location.search.replace(/\?/, '').split('&').map(function(val) {
				urlQuery[decodeURIComponent(val.split('=')[0])] = decodeURIComponent(val.split('=')[1])
			})
		}
		urlQuery['auth_token'] = localStorage.colAuthToken
		var upperUrlQuery = {}
		for (var key in urlQuery) {
			upperUrlQuery[key.toUpperCase()] = urlQuery[key]
		}
		if (!upperUrlQuery['WEBSERVICE']) {
			urlQuery['webservice'] = window.location.hash.replace(/#/, '')
			upperUrlQuery['WEBSERVICE'] = window.location.hash.replace(/#/, '')
		}
		this.webserviceName = upperUrlQuery['WEBSERVICE']
		//bye
		axios
			.post(
				this.apiUrl,
				qs.stringify({
					webservice: 'ITS/Auto Tables/Is Oauth Required',
					webservice_name: upperUrlQuery['WEBSERVICE']
				})
			)
			.then(e => {
				var data = e.data
				if (data[0][0]['OAUTH_REQUIRED']) {
					;(function() {
						//redirects user if they navigate to apps/ instead of apps.cityoflewisville.com/; OAUTH will not redirect to apps/
						if (window.location.host === 'apps') {
							window.location =
								'http://apps.cityoflewisville.com' +
								window.location.pathname +
								window.location.search +
								window.location.hash
						} else {
							
								let apiUrl = 'https://ax1vnode1.cityoflewisville.com/'
								let oauthRedirectUrl = 'http://apps.cityoflewisville.com/oauthredirect/index.html'
							
							function getParameterByName(name, url) {
								if (!url) url = window.location.href
								name = name.replace(/[\[\]]/g, '\\$&')
								var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url)
								if (!results) return null
								if (!results[2]) return ''
								return decodeURIComponent(results[2].replace(/\+/g, ' '))
							}
							var code = getParameterByName('code')
							function getNewColAuthToken(code) {
								var redirectUrl = window.location.href.substr(0, window.location.href.indexOf('?'))
								axios
									.post(
										apiUrl + 'authenticate/',
										qs.stringify({
											code: code,
											redirectUrl: redirectUrl
										})
									)
									.then(e => {
										var data = e.data
										localStorage.colAuthToken = data[0][0]['AUTH_TOKEN']
										window.location = localStorage.redirectUrl
									})
							}
							function getNewCode() {
								localStorage.redirectUrl = window.location.href
								window.location =
									'https://accounts.google.com/ServiceLogin?passive=1209600&continue=https://accounts.google.com/o/oauth2/auth?access_type%3Doffline%26scope%3Dhttps://www.googleapis.com/auth/userinfo.email%2Bhttps://www.googleapis.com/auth/userinfo.profile%26response_type%3Dcode%26redirect_uri%3D' +
									oauthRedirectUrl +
									'%26client_id%3D819027772449-2us5mt2tu1ec84nve9353qka8i6mfj68.apps.googleusercontent.com%26from_login%3D1%26as%3D-64f2a1f67be9764b&oauth=1&sarp=1&scc=1#identifier'
							}
							function verifyColAuthToken(authToken) {
								axios
									.post(
										apiUrl + 'v2',
										qs.stringify({
											webservice: 'ITS/Verify Auth Token',
											auth_token: authToken
										})
									)
									.then(e => {
										var data = e.data
										if (data['Verification'][0]['VERIFIED'] == 0) {
											getNewCode()
										} else {
											localStorage.removeItem('redirectUrl')
											localStorage.colEmail = data['Verification'][0]['EMAIL']
										}
									})
							}
							if (!localStorage.colAuthToken) {
								if (!code) {
									getNewCode()
								} else {
									getNewColAuthToken(code)
								}
							} else {
								if (!code) {
									verifyColAuthToken(localStorage.colAuthToken)
								} else {
									getNewColAuthToken(code)
								}
							}
						}
					})()
				}
			})
		axios
			.post(
				this.apiUrl,
				qs.stringify({
					webservice: 'ITS/Get Parameters For Webservice',
					webservice_name: decodeURI(this.webserviceName),
					auth_token: localStorage.colAuthToken
				})
			)
			.then(e => {
				var data = e.data
				var countOfParametersPreFilled = 0
				if (data.length === 0) {
					data[0] = []
				}
				data[0].map((val, i) => {
					if (upperUrlQuery[val['name'].replace(/@/, '').toUpperCase()]) {
						data[0][i]['value'] = upperUrlQuery[val['name'].replace(/@/, '').toUpperCase()]
						countOfParametersPreFilled += 1
					} else {
						const textTypes = ['char', 'nvarchar', 'varchar', 'varbinary']
						if (textTypes.indexOf(val['PARAMETER_TYPE']) > -1) {
							data[0][i]['value'] = ''
						} else {
							data[0][i]['value'] = null
						}
					}
				})
				this.parameters = data[0]
			  this.parametersLoaded = true 
				if (countOfParametersPreFilled === data[0].length) {
					this.getData()
				}
			})
    },
    getData(ev) {
    //   if (ev) {
    //     ev.preventDefault()
    //   }
      let formData = {
        webservice: decodeURI(this.webserviceName), auth_token: localStorage.colAuthToken
      }
      this.parameters.map(val => {
        if(val['PARAMETER_TYPE'] === 'datetime' && val['value']) {
          val['value'] = val['value'].replace(/T/, '')
        }
        formData[val['name'].replace(/@/, '')] = val['value']
      })
      this.dataIsLoading = true
      axios
        .post(this.apiUrl, 
          qs.stringify(formData))
          .then(e => {
            let data = e.data
            this.data = data
            this.sort.key = null
            this.sort.asc = null
            this.dataIsLoading = false
          })
          .catch(e => {
            console.log(e)
            let data = [[{ Error: 'An error has occurred. Please contact the ITS Department. '}]]
            this.data = data
            this.sort.key = null
            this.sort.asc = null
            this.dataIsLoading = false
          })    
    },
    updateData(resultSet, data) {
	//debugger;
      let newData = this.data
	  newData[resultSet] = data
	  this.data = newData
	  delete this.data[this.cleanWebserviceName]
    },
    updateParameterValue(parameter, newValue) {
	 let parameters = this.parameters
	 if(!arguments[1]) {
		 let newParams = arguments[0]
		 parameters.map(originalParam => {
			newParams.map(newParam => {
				if(originalParam.name.replace('@', '') === newParam.name) {
					originalParam.value = newParam.value
				}
				return originalParam	
			})
			return originalParam
		 })
		 this.parameters = parameters
	 } else {
      parameters.map( (val, index) => {
        if(val['name'] === parameter['name']) {
          parameters[index]['value'] = newValue
        }
      })
	  this.parameters = parameters
	 }
	 this.getData()
	 this.showingResultsFor = `Showing results for: ${this.parameters.map((p, i) => `${p.name.replace('@', '')} = ${p.value} `)}` 
    }
  },
  computed: {
      apiUrl() {
		   return 'http://ax1vnode1.cityoflewisville.com/v2/'
      },
      cleanWebserviceName() {
        return decodeURI(this.webserviceName).replace(/_/g, ' ')
	  },
	  exportPath() {
		  return `https://ax1vnode1.cityoflewisville.com/v2/html?webservice=${this.webserviceName}`
	  },
	  dataKeys() {
		  return Object.keys(this.data)
	  },
      returnedData() {
        Object.keys(this.data).map(val => {
          if (this.data[val].length === 0) {
            this.data[val][0] = {}
            this.data[val][0]['Error'] = 'No results found'
          }
        })
      }
    },
   mounted() {
	 this.initializeWebserviceInfo(),
   },
   watch: {
     '$route.hash': function() {
       this.initializeWebserviceInfo()
     }
   }
}
</script>

<style>
.v-toolbar__content {
	height:80px !important;
}
#wrapper2 {
	overflow-x: scroll;
	overflow-y:hidden;
	background:#424242;
	margin-bottom:110px;

}
.v-table__overflow::-webkit-scrollbar {
  width: 1em !important;
}
 
.v-table__overflow::-webkit-scrollbar-thumb {
  background-color: darkgrey !important;
  outline: 1px solid slategrey !important;
}
.container.grid-list-md.text-xs-center {
    margin-top: 40px;
}
.div1 {
  width:9999px;
  height: 20px; 
  }
button#export-button {
    background: deepskyblue;
    text-decoration: none !important;
    position: absolute;
    top: -122px;
    z-index: 100;
    right: 175px;
}
#app > div > main > div > div > div > div > div > div > form > span {
	margin:0 12px;
}
#app > div > main > div > div > div > div > div > div > form > span > div {
    display: inline-block;
}
span#paramval {
    font-size: 1rem;
}
.v-datatable__actions {
    justify-content: flex-start !important;
    /* bottom: -60px !important; */
    position: absolute !important;
    left: .3px;
    margin-top: 33px;
    width: -webkit-fill-available;
}
.v-input input {
    font-size:10px !important;
}
.layout.row.wrap {
    padding: 20px;
}
</style>