import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { Colors } from "../utils/Colors";
const { width } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    title: "¡Bienvenido a Radar Earth!",
    description: "Tu app para alertas sísmicas en tiempo real.",
    image: require("../../assets/logo.jpeg"),
  },
  {
    key: "2",
    title: "Recibe alertas inmediatas",
    description: "Te notificamos al instante cuando ocurre un sismo relevante cerca de ti.",
    image: require("../../assets/recibe_alertas.png"),
  },
  {
    key: "3",
    title: "Visualiza epicentros en el mapa",
    description: "Consulta la ubicación y detalles de los últimos sismos en un mapa interactivo.",
    image: require("../../assets/mapa_sismico.png"),
  },
  {
    key: "4",
    title: "Personaliza tus notificaciones",
    description: "Configura la intensidad mínima y las regiones de interés para tus alertas.",
    image: require("../../assets/personaliza_notificaciones.png"),
  },
  {
    key: "5",
    title: "¡Listo para comenzar!",
    description: "Explora todas las funciones y mantente seguro.",
    image: require("../../assets/listo_empezar.png"),
  },
];

export default function Onboarding({ onFinish }) {
  const [current, setCurrent] = useState(0);
  const flatListRef = useRef();

  const handleNext = () => {
    if (current < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: current + 1 });
    } else if (onFinish) {
      onFinish();
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrent(index);
        }}
      />
      <View style={styles.dotsContainer}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, current === i && styles.dotActive]} />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>{current === slides.length - 1 ? "¡Comenzar!" : "Siguiente"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: width * 1,
    height: width * 1,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#024280',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: '#024280',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
