import React from "react";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Colors } from "../utils/Colors";
import { useThemeStore } from "../stores/themeStore";
export default function HelpModal({ visible, onClose }) {
    const theme = useTheme();
    const darkMode = useThemeStore((state) => state.darkMode);
    
    const colorInfo = [
        {
            color: '#4CAF50',
            label: 'Verde',
            desc: 'Magnitud baja (menor a 4.0). Sismos leves, usualmente imperceptibles.',
        },
        {
            color: '#FFC107',
            label: 'Amarillo',
            desc: 'Magnitud moderada (4.0 - 5.9). Sismos perceptibles pero poco dañinos.',
        },
        {
            color: '#F44336',
            label: 'Rojo',
            desc: 'Magnitud fuerte (6.0 - 6.9). Sismos potencialmente dañinos.',
        },
        {
            color: '#9C27B0',
            label: 'Violeta',
            desc: 'Magnitud muy fuerte (7.0 o más). Sismos peligrosos y destructivos.',
        },
    ];
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <View style={helpStyles.modalOverlay}>
                <View style={[helpStyles.modalContent,{ backgroundColor: theme.colors.surface}]}>
                    <Text style={[helpStyles.modalTitle,{ color: darkMode ? 'white' : 'black' }]}>¿Qué significan los colores?</Text>
                    {colorInfo.map((item) => (
                        <View key={item.label} style={helpStyles.colorRow}>
                            <View style={[helpStyles.colorCircle, { backgroundColor: item.color }]} />
                            <View style={{ flex: 1 }}>
                                <Text style={[helpStyles.colorLabel,{ color: darkMode ? 'white' : 'black' }]}>{item.label}</Text>
                                <Text style={[helpStyles.colorDesc,{ color: darkMode ? 'white' : 'black' }]}>{item.desc}</Text>
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity style={helpStyles.closeButton} onPress={onClose}>
                        <Text style={helpStyles.closeButtonText}>Entendido</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const helpStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '88%',
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 24,
        elevation: 8,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 18,
        color: '#222',
    },
    colorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        width: '100%',
    },
    colorCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#eee',
    },
    colorLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222',
    },
    colorDesc: {
        fontSize: 14,
        color: '#555',
    },
    closeButton: {
        marginTop: 24,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 32,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
