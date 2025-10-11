import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

/**
 * RippleOverlay: Un círculo animado que se muestra sobre el mapa, usando Animated.View para máxima fluidez.
 * Props:
 * - size: diámetro máximo del ripple en px
 * - color: color base en formato rgba (ej: 'rgba(76,175,80,0.3)')
 * - duration: duración de cada ciclo en ms
 * - isPulsing: si la animación está activa
 * - style: estilos adicionales para el contenedor
 */
export default function RippleOverlay({ size = 200, color = 'rgba(76,175,80,0.3)', duration = 1800, isPulsing = true, style }) {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const animation = useRef(null);

  useEffect(() => {
    if (isPulsing) {
      scale.setValue(0);
      opacity.setValue(1);
      const base = Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]);
      animation.current = Animated.loop(base);
      animation.current.start();
    } else {
      if (animation.current) animation.current.stop();
    }
    return () => {
      if (animation.current) animation.current.stop();
    };
  }, [isPulsing, duration]);

  return (
    <View pointerEvents="none" style={[styles.container, { width: size, height: size }, style]}>
      <Animated.View
        style={[
          styles.ripple,
          {
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: size / 2,
            opacity,
            transform: [{ scale }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
    zIndex: 9999,
    pointerEvents: 'none',
  },
  ripple: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
