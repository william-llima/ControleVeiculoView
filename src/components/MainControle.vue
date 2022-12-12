<template>
    <div id="containerComponent">
        <h1>Cadastro de controle</h1>
            <form>
                <v-select
            v-model="select"
            :items="itemsVeiculo"
            :error-messages="selectErrors"
            label="Veiculo"
            required
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
            ></v-select>
            <v-select
            v-model="select2"
            :items="itemsMotorista"
            :error-messages="selectErrors"
            label="Motorista"
            required
            @change="$v.select2.$touch()"
            @blur="$v.select2.$touch()"
            ></v-select>
            <v-text-field
            v-model="ControleData.Data_saida"
            :error-messages="Data_saidaErrors"
            :counter="10"
            label="Data saida (yyy-mm-dd)"
            required
            @input="$v.Data_saida.$touch()"
            @blur="$v.Data_saida.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="ControleData.Hora_saida"
            :error-messages="Hora_saidaErrors"
            :counter="10"
            label="Hora saida"
            required
            @input="$v.Hora_saida.$touch()"
            @blur="$v.Hora_saida.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="ControleData.Km_saida"
            :error-messages="Km_saidaErrors"
            :counter="10"
            label="Km saida"
            required
            @input="$v.Km_saida.$touch()"
            @blur="$v.Km_saida.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="ControleData.Destino"
            :error-messages="DestinoErrors"
            label="Destino"
            required
            @input="$v.Destino.$touch()"
            @blur="$v.Destino.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="ControleData.Data_retorno"
            :error-messages="Data_retornoErrors"
            label="Data retorno (yyyy-mm-dd)"
            required
            @input="$v.Data_retorno.$touch()"
            @blur="$v.Data_retorno.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="ControleData.Hora_retorno"
            :error-messages="Hora_retornoErrors"
            :counter="10"
            label="Hora retorno"
            required
            @input="$v.Hora_retorno.$touch()"
            @blur="$v.Hora_retorno.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="ControleData.Km_Retorno"
            :error-messages="Km_RetornoErrors"
            :counter="10"
            label="Km Retorno"
            required
            @input="$v.Km_Retorno.$touch()"
            @blur="$v.Km_Retorno.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="ControleData.Km_percorrido"
            :error-messages="Km_percorridoErrors"
            :counter="10"
            label="Km percorrido"
            required
            @input="$v.Km_percorrido.$touch()"
            @blur="$v.Km_percorrido.$touch()"
            ></v-text-field>
            <v-btn
            class="mr-4"
            color="success"
            @click="submit('create')"
            >
            submit
            </v-btn>
            <v-btn
            class="mr-4"
            color="primary"
            @click="submit('update')"
            >
            Update
            </v-btn>
            <v-btn @click="clear">
            clear
            </v-btn>
                <v-alert v-model="alert" class="mt-4" :type="typeAlert" v-if="returnResponse" dismissible >
                    {{returnResponse}}
                </v-alert>
        </form>
    </div>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
        Data_saida:{ required },
        Hora_saida:{ required },
        Km_saida:{ required },
        Destino:{ required },
        Data_retorno:{ required },
        Hora_retorno:{ required },
        Km_Retorno:{ required },
        Km_percorrido:{ required },
        select: { required },
        select2:{required}
    },

    data: () => ({
      ControleData:{
        Data_saida:'',
        Hora_saida:'',
        Km_saida:'',
        Destino:'',
        Data_retorno:'',
        Hora_retorno:'',
        Km_Retorno:'',
        Km_percorrido:'',
        Veiculo:'',
        Motorista:''
      },
      select: null,
      select2: null,
      returnResponse:'',
      typeAlert:'success',
      alert:false,
      itemsVeiculo: [],
      itemsMotorista: []
      
    }),

    computed: {
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      Data_saidaErrors () {
        const errors = []
        if (!this.$v.Data_saida.$dirty) return errors
        !this.$v.Data_saida.required && errors.push('is required.')
        return errors
      },
      Hora_saidaErrors () {
        const errors = []
        if (!this.$v.Hora_saida.$dirty) return errors
        !this.$v.Hora_saida.required && errors.push('is required')
        return errors
      },
      Km_saidaErrors () {
        const errors = []
        if (!this.$v.Km_saida.$dirty) return errors
        !this.$v.Km_saida.required && errors.push('is required')
        return errors
      },
      DestinoErrors () {
        const errors = []
        if (!this.$v.Destino.$dirty) return errors
        !this.$v.Destino.required && errors.push('is required')
        return errors
      },
      Hora_retornoErrors () {
        const errors = []
        if (!this.$v.Hora_retorno.$dirty) return errors
        !this.$v.Hora_retorno.required && errors.push('is required')
        return errors
      },
      Km_RetornoErrors () {
        const errors = []
        if (!this.$v.Km_Retorno.$dirty) return errors
        !this.$v.Km_Retorno.required && errors.push('is required')
        return errors
      },
      Km_percorridoErrors () {
        const errors = []
        if (!this.$v.Km_percorrido.$dirty) return errors
        !this.$v.Km_percorrido.required && errors.push('Km percorrido is required')
        return errors
      },
      Data_retornoErrors () {
        const errors = []
        if (!this.$v.Km_percorrido.$dirty) return errors
        !this.$v.Km_percorrido.required && errors.push('Km percorrido is required')
        return errors
      },
    },
    created(){
        this.$http.get('motorista')
        .then(resp=>{
             resp.data.forEach(element => {
                this.itemsMotorista.push(element.Cod_Motorista)    
            });
        })
        this.$http.get('veiculo')
        .then(resp=>{
            resp.data.forEach(element =>{
                this.itemsVeiculo.push(element.Placa)
            })
        })
       
        if(this.$store.state.controle !={}){
            this.ControleData=this.$store.state.controle
            this.select = this.ControleData.Veiculo
            this.select2 = this.ControleData.Motorista
        }
    },
    methods: {
      submit (method) {
            this.$v.$touch()
            this.ControleData.Veiculo = this.select
            this.ControleData.Motorista = this.select2
            if(method=='create'){
                    this.alert=true
                        this.$http.post('controle',this.ControleData)
                        .then(resp => {
                            
                        if(resp.data =="Added SucessFully" && resp.status ==200){
                            this.typeAlert='success'
                            this.returnResponse = resp.data
                        }else if(resp.status ==200){
                            this.returnResponse = resp.data
                            this.typeAlert='error'
                        }else{
                            this.typeAlert='error'
                            this.returnResponse = 'Error'
                        }
                    }).catch(err=>{
                        this.returnResponse = err.message
                        this.typeAlert='error'
                       
                    })
                }else if(method=='update'){
                    this.alert=true
                    this.$http.put('controle',this.ControleData)
                    .then(resp => {
                    if((resp.data =="Added SucessFully" || resp.data =="Update SucessFully") && resp.status ==200){
                        this.typeAlert='success'
                        this.returnResponse = resp.data
                    }else if(resp.status ==200){
                        this.returnResponse = resp.data
                        this.typeAlert='error'
                    }else{
                        this.typeAlert='error'
                        this.returnResponse = 'Error'
                    }
                })
                }
        
      },
      clear () {
        this.$v.$reset()
        this.select = null
        this.select2 = null
        this.ControleData.Data_saida='',
        this.ControleData.Hora_saida='',
        this.ControleData.Km_saida='',
        this.ControleData.Destino='',
        this.ControleData.Data_retorno='',
        this.ControleData.Hora_retorno='',
        this.ControleData.Km_Retorno='',
        this.ControleData.Km_percorrido='',
        this.alert=false

      },
    },
  }
</script>
<style>
#containerComponent{
    display: flex;
    flex-direction: column;
    align-items: center;
}
form{
    width: 50%;
}
</style>