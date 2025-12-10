// AQUI ESCREVEMOS OS METODOS PARA PERSISTIR OS DADOS.
import AsyncStorage from "@react-native-async-storage/async-storage" // metodo que vamos utilizar 
import { FilterStatus} from "@/types/FilterStatus"


// Nome que vamos dar ao nosso objeto na memoria 
const ITEMS_STORAGE_KEY = "@comprar:items"

// Criando a tipagem caso for necessário exportar os dados. (vamos utilizar para recuperar na HOME).
export type ItemsStorage = {
    id: string
    status: FilterStatus
    description: string
}

// ============================ FUNÇÕES ===============================

// -------------------- get --------------------
// Criando função para pegar os dados no BD. 
// async e para dizer que não e algo sincronizado.
// Promisse. Um tipo de promessa que vai retornar dados, então a aplicação tem que aguardar retornar
// <ItemStorage[]>. O tipo de dado que a aplicação tem que esperar. ItemStorage em formato de lista.
// no return cruamos um IF Ternário. Se tiver algum dado no BD ele retorna em objeto Json, caso contrario retorna uma lista vazia.
async function get(): Promise<ItemsStorage[]> {
    try{
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)
        return storage ? JSON.parse(storage) : []
    } catch (error){
        throw new Error("ITEMS_GET:" + error)
    }
}

// -------------------- getByStatus --------------------
// Retorna items por status do filtro
async function getByStatus(status: FilterStatus): Promise<ItemsStorage[]> {
        const items = await get()
        return items.filter((item) => item.status === status)    
}


async function save(items: ItemsStorage[]): Promise<void>{
    try{
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
    } catch(error){
        throw new Error("ITEM_SAVE: " + error)
    }
}

async function add(newItem: ItemsStorage): Promise<ItemsStorage[]>{
    const items = await get()
    const updatedItems = [...items, newItem]
    await save(updatedItems)

    return updatedItems
}


// Esportando os metodos do BD
export const itemsStorage = {
    get,
    getByStatus,
    add,

}