<template>
<div id="param-container">
    <div class="paramInput" v-for="(parameter, index) in parameters" :key="index">
        <div class="paramInput" v-if="textTypes.indexOf(parameter['PARAMETER_TYPE']) > -1">
            <label>{{ parameter.name.replace(/@/, '').replace(/_/g, ' ') }}&nbsp;&nbsp;</label>
            <input ref="input" v-bind="parameter" @change="updateValue" type="text"/>
        </div>
        <div class="paramInput" v-else-if="parameter['PARAMETER_TYPE'] == 'datetime'">
            <label>{{ parameter.name.replace(/@/, '').replace(/_/g, ' ') }}&nbsp;&nbsp;</label>
            <input ref="input" v-bind="parameter" @change="updateValue" type="datetime-local"/>
        </div>
        <div class="paramInput" v-else-if="parameter['PARAMETER_TYPE'] == 'date'">
            <label>{{ parameter.name.replace(/@/, '').replace(/_/g, ' ') }}&nbsp;&nbsp;</label>
            <input ref="input" v-bind="parameter" @change="updateValue" type="date"/>
        </div>
        <div class="paramInput" v-else-if="numTypes.indexOf(parameter['PARAMETER_TYPE']) > -1">
            <label>{{ parameter.name.replace(/@/, '').replace(/_/g, ' ') }}&nbsp;&nbsp;</label>
            <input ref="input" v-bind="parameter" @change="updateValue" type="number"/>
        </div>
        <div class="paramInput" v-else-if="parameter['PARAMETER_TYPE'] === 'bit'">
            <label>{{ parameter.name.replace(/@/, '').replace(/_/g, ' ') }}&nbsp;&nbsp;</label>
            <input ref="input" v-bind="parameter" @change="updateCheckboxValueToFalse" type="checkbox"/>
        </div>
        <div class="paramInput" v-else>
            <label>
                <input ref="input" v-bind="parameter" @change="updateCheckboxValueToTrue" type="checkbox"/>
                {{ parameter.name.replace(/@/, '').replace(/_/g, ' ') }}
            </label>
        </div>
    </div>
    <v-btn v-if="parameters.length" color="success" @click="updateSelectedParams">CLICK TO SUBMIT</v-btn>
</div>
</template>

<script>
export default {
props: ['parameters', 'updateParameterValue'],
data() {
    return {
        textTypes: ['char','nvarchar','varchar','varbinary'],
        numTypes: ['int', 'bigint', 'numeric', 'float', 'decimal']
    }
},
    methods: {
        updateValue: function(e) {
            let fieldName = e.path[1].innerText.trim()
            let val = e.target.value
            let paramIndex = this.availableParams.findIndex(a => a.name == fieldName)
            this.$set(this.availableParams[paramIndex], 'value', val)
        },
        updateCheckboxValueToTrue(e) {
            this.updateParameterValue(this.parameter, true)
        },
        updateCheckboxValueToFalse(e) {
            this.updateParameterValue(this.parameter, false)
        },
        updateSelectedParams: function() {
            this.$emit('selectedParams', this.availableParams)
            this.updateParameterValue(this.availableParams)
        }
    },
    mounted() {
        },
    computed: {
        textTypeIsParam() {
            return 
        },
        availableParams() {
        return this.parameters.map(p => {
                return {
                    name: p.name.replace('@',''),
                    value: p.value || null,
                    type: p.PARAMETER_TYPE
                }
            })
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
.paramInput {
    display: inline-block;
    margin: 0 12px;
}
div#param-container {
    background: #424242;
    color: white;
    border-bottom: 1px solid #999;
    border-bottom-style: dotted;
}
</style>
