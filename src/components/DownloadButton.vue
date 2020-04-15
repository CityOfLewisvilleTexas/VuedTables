<template>
    <v-btn :color="color" :style="{'clip': determineClipLength(jsonData.length, buttonText)}" class="btn-download" @click="JSONtoCSVConvertor">
        {{ buttonText }}&nbsp;({{ jsonData.length }} result{{jsonData.length > 1 ? 's' : ''}})
        &nbsp;&nbsp;&#8595;
    </v-btn>
</template>

<script>
export default {
    props: ['jsonData', 'title', 'buttonText', 'buttonClass', 'color'],
    data() {
        return {

        }
    },
    methods: {
        determineClipLength(num, btnText) {
            num = num.toString()
            if(btnText === 'Download Filtered Data') {
                if(num.length > 3) {
                    return 'rect(0px, 321px, 190px, 307px)'
                } else if(num.length > 2 && num.length < 4) {
                    return 'rect(0px, 313.5px, 190px, 299px)'
                }
                else if(num.length === 2) {
                    return 'rect(0px, 306.5px, 190px, 290px)'
                } 
                else {
                    return 'rect(0px, 289.5px, 190px, 274.5px)'//'rect(0px, 298.5px, 190px, 281.5px)'
                    }
            }
            if(num.length > 3) {
                return 'rect(0px, 285px, 190px, 270px)'
            } else if(num.length > 2 && num.length < 4) {
            return 'rect(0px, 277px, 190px, 262px)'
             }
             else if(num.length === 2) {
            return 'rect(0px, 269.5px, 190px, 254px)'
            } 
             else {
            return 'rect(0px, 262px, 190px, 245px)'
                }
            },
        JSONtoCSVConvertor(JSONData, ReportTitle, ShowLabel) {
            let getNonObjectKeys = obj => {
                let nonObjectKeys = []
                for (var key in obj) {
                    if(typeof obj[key] !== 'object' || obj[key] === null) {
                        nonObjectKeys.push(key)
                    }
                }
                return nonObjectKeys
            }
            JSONData = this.jsonData
            JSONData.map( val => {
                Object.keys(val).map( key => {
                    if (getNonObjectKeys(val).indexOf(key) === -1) {
                        delete val[key]
                    }
                })
            })
            ReportTitle = this.title
            ShowLabel = true
            //If JSONData is not a n obj then JSON.parse will parse the JSON string in an obj
            let arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData

            let CSV = ''
            //Set Report Title in first row / line

            CSV += ReportTitle + '\r\n\n'

            //This condition will generate the Label/Header
            if(ShowLabel) {
                let row = ""

                //This loop will extract the label from 1st index of an array
                for (var index in arrData[0]) {

                    //Now convert each value to string and comma-separate
                    row += `${index.toString()},`
                }

                row = row.slice(0, -1)

                //append Label row with line break
                CSV += row + '\r\n'
            }

            //1st loop is to exract each row
            for (var i = 0; i < arrData.length; i++) {
                let row = ""

                //2nd loop will extract each column and convert it in string comma-separated
                for(var index in arrData[i]) {
                    if (arrData[i][index] === null) {
                        arrData[i][index] = ''
                    }
                    row +='"' + arrData[i][index] + '",'
                }
                row.slice(0, row.length)

                    CSV += row + '\r\n'
            }

            if (CSV == '') {
                alert('Invalid data')
                return
            }

            let fileName = 'MyReport__'
            fileName += ReportTitle.replace(/ /g, "_")

            if (navigator.msSaveBlob) {
                let blob = new Blob([CSV], { type: 'text/csv;charset=utf-8;'})
                navigator.msSaveBlob(blob, fileName + '.csv')
            }
            else {
                let uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(CSV)

                //Now the tricky part
                //you can use either window.open(url)
                //but this will not work in some browsers
                //or you will not get the correct file extension

                //this trick will generate a temp <a /> tag
                let link = document.createElement("a")
                link.href = uri

                try {
                    link.style = "visibility:hidden"
                }
                catch(err) {
                    console.log(err)
                }
                link.download = fileName + '.csv'
                
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        }

    }    
}
</script>

<style lang="scss" scoped>
    .btn-download {
        // position:absolute;
    }
</style>
