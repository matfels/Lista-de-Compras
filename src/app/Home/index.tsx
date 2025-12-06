// Importando os componentes View e Text do react-native
import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native"
import { styles } from "./styles"
import { Button } from "@/components/Button/index"
import { Input } from "@/components/Input/index"
import { Filter } from "@/components/Filter/index"
import { FilterStatus } from "@/types/FilterStatus"
import { Item } from "@/components/Item"


const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

// Exportando por padrão uma função vazia chamada App

// --------------------------------- Regras para criar um componente -------------------------------- //
// Componente tem que começar com letra maiúscula
// O componente pode retornar um unico elemento pai, que pode ter varios elementos filhos dentro dele.
export function Home() {

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
        <ScrollView>

        {Array.from({ length: 100 }).map((value, index) => (
          
          <Item
          key={index}
          data={{ status: FilterStatus.DONE, description: "café" }}
          onStatus={() => console.log("Muda o status")}
          onRemove={() => console.log("remover")}
          />
        ))}
        </ScrollView>

      </View>
    </View>

  )

}


