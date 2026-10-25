// ============================================================
//   SERVICE — consulta de endereço pelo CEP (API pública ViaCEP)
// ============================================================
import axios from 'axios'

export async function buscarCep(cep) {
    // \D = "qualquer coisa que NÃO é dígito". O replace com regex global
    // remove pontos, traços e espaços, deixando só os números do CEP.
    const cepLimpo = cep.replace(/\D/g, '')

    // Validação no cliente ANTES de gastar uma requisição de rede:
    // se não tem 8 dígitos, nem faz sentido consultar a API.
    if (cepLimpo.length !== 8) {
        throw new Error('O CEP deve ter 8 dígitos.')
    }

    const { data } = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)

    // Detalhe da ViaCEP: um CEP inexistente NÃO gera erro HTTP; ela
    // responde 200 com { erro: true }. Por isso checamos manualmente.
    if (data.erro) {
        throw new Error('CEP não encontrado.')
    }

    return data
}