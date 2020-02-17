# @emiolo/cep-promise
> Wrapper simples das funções do pacote [cep-promise](https://www.npmjs.com/package/cep-promise) para utilização interna

## Motivação
Extender as funcionalidades do pacote de acordo com os padrões de uso interno da empresa.

## Instalação
```shell
npm i -S @emiolo/cep-promise
```

## Utilização básica com o Vue
```vue
<template>
  <div>
    <input v-model="cep" @input="getCep($event.target.value)" />
    <pre align="left">{{ $data }}</pre>
  </div>
</template>

<script>
import CepPromise from '@emiolo/cep-promise'

export default {
  data: () => ({
    cep: '',
    address: null,
    error: null,
    loading: false,
    getCep: () => null, // Declara uma função vazia
  }),
  created() {
    // Após a inicialização do componente, atribui a função
    // de captura "preguiçosa" do CEP, que só será executada
    // após 500ms que a última tecla for digitada
    this.getCep = CepPromise.debounce(this.cepHandler, {
      delay: 500,
      onLoading: this.setLoading,
    })
  },
  methods: {
    cepHandler(result, error) {
      // Esse é o método responsável por exibir o resultado na tela
      this.address = result
      this.error = error
    },
    setLoading(status) {
      // Esse é o método responsável por indicar se o CEP está sendo
      // consultado no momento
      this.loading = status
    },
  },
}
</script>
```

