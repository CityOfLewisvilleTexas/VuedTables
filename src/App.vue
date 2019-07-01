<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Auto</span>
        <span class="font-weight-light">TABLES</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <div v-if="!dataIsLoading">
            <Loader></Loader>
          </div>
          <v-card v-else dark color="#390959">
                <!-- @TODO: first, create ParameterInput comp, then work on refactoring DataTable -->
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
import DownloadButton from './components/DownloadButton'

export default {
  name: 'App',
  components: {
    Loader,
    ParameterInput,
    DataTable,
    DownloadButton
  },
  data () {
    return {
      data: [],
      dataIsLoading: false,
      webserviceName: '',
      parameters: [],
      parametersLoaded: false,
      sort: {
        key: null,
        asc: null
      }
    }
  },
  methods: {
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
							var apiUrl, oauthRedirectUrl
							if (window.location.href.split('://')[1].split('.')[0].toLowerCase() === 'eservices') {
								apiUrl = 'https://query.cityoflewisville.com/'
								oauthRedirectUrl = 'http://eservices.cityoflewisville.com/oauthredirect/index.html'
							} else {
								apiUrl = 'https://ax1vnode1.cityoflewisville.com/'
								oauthRedirectUrl = 'http://apps.cityoflewisville.com/oauthredirect/index.html'
							}
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
      if (ev) {
        ev.preventDefault()
      }
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
      let newData = this.data
      newData[resultSet] = data
      this.data = newData
    },
    updateParameterValue(parameter, newValue) {
      let parameters = this.parameters
      parameters.map( (val, index) => {
        if(val['name'] === parameter['name']) {
          parameters[index]['value'] = newValue
        }
      })
      this.parameters = parameters
    }
  },
  computed: {
      apiUrl() {
          window.location.href.split('://')[1].split('.').toLowerCase() === 'eservices' 
          ? 'http://query.cityoflewisville.com/v2/' 
          : 'http://ax1vnode1.cityoflewisville.com/v2/'
      },
      decodedWebserviceName() {
        return decodeURI(this.webserviceName)
      },
      returnedData() {
        Object.keys(this.data).map(val => {
          if (this.data[val].length === 0) {
            this.data[val][0] = {}
            this.data[val][0]['Error'] = 'No results found'
          }
        })
        //refactor render() in react to <template/>. create loader component, if isLoading { <Loader/> } else { render() }
      }
    },
   mounted() {
     this.initializeWebserviceInfo()
   },
   watch: {
     'window.location.hash': function() {
       this.initializeWebserviceInfo()
     }
   }
}
</script>
