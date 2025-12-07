// Importando os componentes View e Text do react-native
import { View, Image, TouchableOpacity, Text, FlatList } from "react-native"
import { styles } from "./styles"
import { Button } from "@/components/Button/index"
import { Input } from "@/components/Input/index"
import { Filter } from "@/components/Filter/index"
import { FilterStatus } from "@/types/FilterStatus"
import { Item } from "@/components/Item"


const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
const ITEMS = [
  {id: "1", status: FilterStatus.DONE, description: "1 pacote de cafe"},
  {id: "2", status: FilterStatus.PENDING, description: "3 pacote de MACARRÃO"},
  {id: "3", status: FilterStatus.PENDING, description: "3 Cebolas"}  
]

// Exportando por padrão uma função vazia chamada App

// --------------------------------- Regras para criar um componente -------------------------------- //
// Componente tem que começar com letra maiúscula
// O componente pode retornar um unico elemento pai, que pode ter varios elementos filhos dentro dele.
export function Home() {
  console.log("ITEMS", ITEMS)
  // Toda função precisa retornar algo, o conteudo retornado aqui será exibido na tela.
  // View foi importado lá em cima, junto com o Text. "Essa View é o elemento pai" os elementos tem que estar dentro dela.

  return (

    <View style={styles.container}>

      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Entrar" onPress={() => console.log("Entrar")} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter key={status} status={status} isActive />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={[]}
          keyExtractor={item => item.id}
          renderItem={({item}) =>(
            <Item
              data={item}
              onStatus={() => console.log("Muda o status")}
              onRemove={() => console.log("remover")}
            />            
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
        />

      </View>
    </View>

  )

}


