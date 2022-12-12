<template>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn
                color="primary"
                dark
                to="/controle"
              >
                New Item
              </v-btn>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </template>
  <script>
  export default {
    data () {
      return {
        dialog: false,
        dialogDelete: false,
        search: '',
        editedIndex: -1,
        itemData:'',
        headers: [{
            text: 'Controle Id',
            align: 'start',
    
            value: 'controle_ID',
          },
          { text: 'Veiculo',value: 'Veiculo'},
          { text: 'Motorista', value: 'Motorista' },
          { text: 'Data saida', value: 'Data_saida' },
          { text: 'Hora saida', value: 'Hora_saida' },
          { text: 'km saida', value: 'Km_saida' },
          { text: 'Destino', value: 'Destino' },
          { text: 'Data retorno', value: 'Data_retorno' },
          { text: 'Hora retorno', value: 'Km_Retorno' },
          { text: 'Km retorno', value: 'Km_Retorno' },
          { text: 'Km percorrido', value: 'Km_percorrido' },
          { text: 'actions', value: 'actions' }
        ],
        desserts: [],
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created(){
        this.$http.get('controle')
        .then(resp=>{
            this.desserts = resp.data
        })
        this.$store.commit('adicionarControle',{})
    },
    methods:{
        editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.$store.commit('adicionarControle',item) 
        this.$router.push('/controle')
      },

      deleteItem (item) {
        this.itemData=item
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
      
        this.$http.delete('controle',{ data:this.itemData })
        .then(resp=>{
            
            if(resp.status==200){
                this.desserts.splice(this.editedIndex, 1)
            }
        }).catch(err=>{
            console.log(err)
        })
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

    }
  }
</script>