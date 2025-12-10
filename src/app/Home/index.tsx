import { useState, useEffect, use } from "react"
// Importando os componentes View e Text do react-native
import { View, Image, TouchableOpacity, Text, FlatList, Alert } from "react-native"
import { styles } from "./styles"
import { Button } from "@/components/Button/index"
import { Input } from "@/components/Input/index"
import { Filter } from "@/components/Filter/index"
import { FilterStatus } from "@/types/FilterStatus"
import { Item } from "@/components/Item"
import { itemsStorage, ItemsStorage } from "@/storage/itemsStorage"

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]


// Exportando por padrão uma função vazia chamada App

// --------------------------------- Regras para criar um componente -------------------------------- //
// Componente tem que começar com letra maiúscula
// O componente pode retornar um unico elemento pai, que pode ter varios elementos filhos dentro dele.
export function Home() {
  //                      ESTADOOSSS
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemsStorage[]>([])


  async function handleAdd() {
    if (!description.trim()) {
      console.log("Chamando a função handleAdd, caixa de texto valia")
      return Alert.alert("Adicionar", "Informe a descrição para adicionar um item.")
    }
    const newItem = {
      description,
      id: Math.random().toString(36).substring(2),
      status: FilterStatus.PENDING,

    }
    await itemsStorage.add(newItem)
    await getItems()
    //    console.log(items)
    //    setItems((prevState) =>[...items, newItem])
  }

  async function getItems() {
    try {
      const response = await itemsStorage.get()
      setItems(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível filtar os itens.")
    }
  }
  useEffect(() => {
    getItems()
  }, [])
  // Chamar os dados do BD
  //useEffect(() => {
  // modo não convencional de recuperar dados. não conseguimos utilziar o asinc e await.
  // itemsStorage.get().then(response => console.log(response)) //.then() Só executa quando a promess do "get" retornar os dados do BD

  // }, [])
  // Toda função precisa retornar algo, o conteudo retornado aqui será exibido na tela.
  // View foi importado lá em cima, junto com o Text. "Essa View é o elemento pai" os elementos tem que estar dentro dela.
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => console.log("Muda o status")}
              onRemove={() => console.log("remover")}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
        />

      </View>
    </View>

  )

}


