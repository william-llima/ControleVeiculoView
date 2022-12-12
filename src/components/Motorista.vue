<template>
    <div id="containerComponent">
        <h1>Cadastro de motorista</h1>
            <form>
            <v-text-field
            v-model="MotoristaData.Cod_Motorista"
            :error-messages="Cod_MotoristaErrors"
            :counter="10"
            label="Codigo Motorista"
            required
            @blur="$v.Cod_Motorista.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="MotoristaData.Nome"
            :error-messages="NomeErrors"
            label="Nome"
            required
            @blur="$v.Nome.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="MotoristaData.Telefone"
            :error-messages="TelefoneErrors"
            label="Telefone"
            required
            @blur="$v.Telefone.$touch()"
            ></v-text-field>
            <v-text-field
            v-model="MotoristaData.CNH"
            :error-messages="CNHErrors"
            label="CNH"
            required
            @blur="$v.CNH.$touch()"
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
  import { required} from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
            Cod_Motorista: { required},
            Nome:{ required},
            Telefone: { required},
            CNH:{ required},
    },

    data: () => ({
        MotoristaData:{
            Cod_Motorista: '',
            Nome:'',
            Telefone: '',
            CNH:''
        },
        alert:false,
        returnResponse:'',
        typeAlert:'success',
    }),

    computed: {
      NomeErrors () {
        const errors = []
        if (!this.$v.Nome.$dirty) return errors
        this.MotoristaData.Nome==''&&!this.$v.Nome.required && errors.push('Name is required.')
        return errors
      },
      Cod_MotoristaErrors () {
        const errors = []
        if (!this.$v.Cod_Motorista.$dirty) return errors
        this.MotoristaData.Cod_Motorista==''&&!this.$v.Cod_Motorista.required && errors.push('Codigo motorista is required')
        return errors
      },
      TelefoneErrors () {
        const errors = []
        if (!this.$v.Telefone.$dirty) return errors
        this.MotoristaData.Telefone==''&&!this.$v.Telefone.required && errors.push('Telefone is required')
        return errors
      },
      CNHErrors () {
        const errors = []
        if (!this.$v.CNH.$dirty) return errors
        this.MotoristaData.CNH==''&&!this.$v.CNH.required && errors.push('CNH is required')
        return errors
      },
    },

    methods: {
      submit (method) {
        this.$v.$touch()
        if(method=='create'){
            if( this.MotoristaData.Nome != ''
            && this.MotoristaData.Telefone != ''
            && this.MotoristaData.CNH != ''){
                this.alert=true
                        this.$http.post('motorista',this.MotoristaData)
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
                        console.log(err)
                        this.returnResponse = err.message
                        this.typeAlert='error'
                       
                    })
            }
        }else if(method=='update'){
            if( this.MotoristaData.Cod_Motorista!=''&&
             this.MotoristaData.Nome != ''
            && this.MotoristaData.Telefone != ''
            && this.MotoristaData.CNH != ''){
                this.alert=true
                        this.$http.put('motorista',this.MotoristaData)
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
                    }).catch(err=>{
                        console.log(err)
                        this.returnResponse = err.message
                        this.typeAlert='error'
                       
                    })
            }
        }
        

      },
      clear () {
        this.$v.$reset()
        this.MotoristaData.Cod_Motorista='',
        this.MotoristaData.Nome='',
        this.MotoristaData.Telefone='',
        this.MotoristaData.CNH='',
        this.alert = false
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