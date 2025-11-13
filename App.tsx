// Importando os componentes View e Text do react-native
import {View, Text} from "react-native"



// Exportando por padrão uma função vazia chamada App

// --------------------------------- Regras para criar um componente -------------------------------- //
// Componente tem que começar com letra maiúscula
// O componente pode retornar um unico elemento pai, que pode ter varios elementos filhos dentro dele.
export default function App(){ 

  // Toda função precisa retornar algo, o conteudo retornado aqui será exibido na tela.
  // View foi importado lá em cima, junto com o Text. "Essa View é o elemento pai" os elementos tem que estar dentro dela.

  return(

    <View style={{ flex:1, justifyContent:"center"}}>
        <Text>Olá Mundo!</Text> 

    </View>
    
    )

}
