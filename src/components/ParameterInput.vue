<template>
<div>
    <span>Parameter type for this search is {{ parameter['PARAMETER_TYPE'] }}</span>
    <div v-if="textTypes.indexOf(parameter['PARAMETER_TYPE']) > -1">
        <label>{{ parameter.name.replace(/@/, '').replace(/_/g, ' ') }}&nbsp;&nbsp;</label>
        <input ref="input" v-bind="parameter" @change="updateValue" type="text"/>
    </div>
    <div v-else-if="parameter['PARAMETER_TYPE'] == 'datetime'">
         <label>{{ parameter.name.replace(/@/, '').replace(/_/g, ' ') }}&nbsp;&nbsp;</label>
        <input ref="input" v-bind="parameter" @change="updateValue" type="datetime-local"/>
    </div>
    <div v-else-if="parameter['PARAMETER_TYPE'] == 'date'">
         <label>{{ parameter.name.replace(/@/, '').replace(/_/g, ' ') }}&nbsp;&nbsp;</label>
        <input ref="input" v-bind="parameter" @change="updateValue" type="date"/>
    </div>
    <div v-else-if="numTypes.indexOf(parameter['PARAMETER_TYPE']) > -1">
         <label>{{ parameter.name.replace(/@/, '').replace(/_/g, ' ') }}&nbsp;&nbsp;</label>
        <input ref="input" v-bind="parameter" @change="updateValue" type="number"/>
    </div>
    <div v-else-if="parameter['PARAMETER_TYPE'] === 'bit'">
         <label>{{ parameter.name.replace(/@/, '').replace(/_/g, ' ') }}&nbsp;&nbsp;</label>
        <input ref="input" v-bind="parameter" @change="updateCheckboxValueToFalse" type="checkbox"/>
    </div>
     <div v-else>
         <label>
            <input ref="input" v-bind="parameter" @change="updateCheckboxValueToTrue" type="checkbox"/>
            {{ parameter.name.replace(/@/, '').replace(/_/g, ' ') }}
        </label>
    </div>
</div>
</template>

<script>
export default {
props: ['index', 'parameter', 'updateFunction'],
data() {
    return {
        textTypes: ['char','nvarchar','varchar','varbinary'],
        numTypes: ['int', 'bigint', 'numeric', 'float', 'decimal']
    }
},
    computed: {
         paramType(){
           return this.parameter['PARAMETER_TYPE']
         }
    },
    methods: {
        updateValue(e) {
            this.updateFunction(this.parameter, e.target.value)
        },
        updateCheckboxValueToTrue(e) {
            this.updateFunction(this.parameter, true)
        },
        updateCheckboxValueToFalse(e) {
            this.updateFunction(this.parameter, false)
        }
    },
    mounted() {
            console.log(this.index)
            if (this.index === 0) {
                this.input.focus()
            }
        },
    computed: {
        textTypeIsParam() {
            return 
        }
    }
}
</script>

<style lang="css" scoped>
input {
    margin-top:12px;
    outline: #999 1px;
    outline-color: #999;
    outline-style: auto;
    outline-width: 1px;
    padding:4px;
    margin-bottom:12px;
}
input:focus {
    outline: -webkit-focus-ring-color auto 1px;
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
    outline-width: 1px;
}
</style>
