<template>
<div>
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
    methods: {
        updateValue: function(e) {
            let val = e.target.value
            let name = this.parameter
            this.updateFunction(name, val)
            this.$emit('parameter', val, name)
        },
        updateCheckboxValueToTrue(e) {
            this.updateFunction(this.parameter, true)
        },
        updateCheckboxValueToFalse(e) {
            this.updateFunction(this.parameter, false)
        },

    },
    mounted() {
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
