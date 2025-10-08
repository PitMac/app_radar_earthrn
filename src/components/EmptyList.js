import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
const notActivity = require('../../assets/not_activity.png');
import { Text } from "react-native-paper";
import {Colors} from "../utils/Colors";

export default function EmptyList({ message,message2 }) {
    return(
        <View style={{
            justifyContent: 'center',
            paddingHorizontal: 10,
            marginTop: 10,
        }}>
            {message ?
                <Text style={styles.message}>{message}</Text> :
                <Text style={{ color: "#001f3f" }}> Estimado usuario no se han encontrado datos !</Text>
            }
            <Image
                style={{
                    alignSelf: 'center',
                    height: 350,
                    width: 350,
                }}
                source={notActivity}
                resizeMode="stretch"
            />
            {message2 &&
                <Text style={styles.message2}>{message2}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    message: {
        textAlign: 'center',
        paddingBottom: 20,
        fontSize:30,
        marginBottom:20,
        color: Colors.primary,
    },
    message2: {
        textAlign: 'center',
        paddingBottom: 20,
        fontSize:20,
        marginTop:50,
        color: Colors.primary,
    },
});