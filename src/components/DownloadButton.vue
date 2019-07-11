<template>
    <v-btn primary :class="buttonClass + 'btn'" @click="JSONtoCSVConvertor">{{ buttonText }} ({{ jsonData.length }} results)</v-btn>
</template>

<script>
export default {
    props: ['jsonData', 'title', 'buttonText', 'buttonClass'],
    data() {
        return {

        }
    },
    methods: {
        JSONtoCSVConvertor(JSONData, ReportTitle, ShowLabel) {
            debugger;
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
                    row += `${index},`
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

</style>
