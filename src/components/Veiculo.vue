<template>
    <div id="containerComponent">
        <h1>Cadastro de veiculo</h1>
            <form>
            <v-text-field
            v-model="VeiculoData.Placa"
            :error-messages="PlacaErrors"
            :counter="10"
            label="Placa"
            required
            @blur="$v.Placa.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="VeiculoData.Marca"
            :error-messages="ModeloErrors"
            label="Marca"
            required
            @blur="$v.Marca.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="VeiculoData.Veiculo"
            :error-messages="VeiculoErrors"
            label="Veiculo"
            required
            @blur="$v.Veiculo.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="VeiculoData.Km_Troca_Oleo"
            :error-messages="kmtrocaoleoErrors"
            label="km troca de oleo"
            required
            @blur="$v.Km_Troca_Oleo.$touch()"
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
  import { required, maxLength } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      Placa: { required, maxLength: maxLength(10) },
      Marca: { required},
      Veiculo: { required},
      Km_Troca_Oleo:{required},
      select:{required}
    },

    data: () => (
        {
        VeiculoData:{
            Placa: '',
            Marca: '',
            Veiculo: '',
            Km_Troca_Oleo: '',
        },
        returnResponse:'',
        typeAlert:'success',
        alert:false
    }
    ),

    computed: {
      PlacaErrors () {
        const errors = []
        if (!this.$v.Placa.$dirty) return errors
        this.VeiculoData.Placa==''&&!this.$v.Placa.required && errors.push('Placa is required.')
        return errors
      },
      ModeloErrors () {
        const errors = []
        if (!this.$v.Marca.$dirty) return errors
        this.VeiculoData.Marca==''&& !this.$v.Marca.required && errors.push('Modelo is required')
        return errors
      },
      VeiculoErrors () {
        const errors = []
        if (!this.$v.Veiculo.$dirty) return errors
        this.VeiculoData.Veiculo==''&&!this.$v.Veiculo.required &&  errors.push('Veiculo is required')
        return errors
      },
      kmtrocaoleoErrors () {
        const errors = []
        if (!this.$v.Km_Troca_Oleo.$dirty) return errors
        this.VeiculoData.Km_Troca_Oleo==''&&!this.$v.Km_Troca_Oleo.required && errors.push('Km troca de oleo is required')
        return errors
      },
    }, 
    methods: {
      submit (method) {
       this.$v.$touch()
            if(this.VeiculoData.Placa !='' && this.VeiculoData.Marca !=''
            && this.VeiculoData.Veiculo !='' 
            && this.VeiculoData.Km_Troca_Oleo !='' ){
                if(method=='create'){
                    this.alert=true
                        this.$http.post('veiculo',this.VeiculoData)
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
                    this.$http.put('veiculo',this.VeiculoData)
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
                 
            } 
      },
      clear () {
        this.$v.$reset()
        this.VeiculoData.Placa = ''
        this.VeiculoData.Marca = ''
        this.VeiculoData.Veiculo = ''
        this.VeiculoData.Km_Troca_Oleo=''
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