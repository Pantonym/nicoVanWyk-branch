import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'; //a lot of other cool pickers available rather than this one
import React, { useEffect, useState } from 'react'
import { addReading, getAllDays } from '../services/FirestoreServices';
import { Timestamp } from 'firebase/firestore';

const AddScreen = ({ navigation }) => {

    const [temperature, setTemp] = useState("")
    const [selectedDay, setSelectedDay] = useState("")

    const handleCreation = async () => {
        // Create new reading for the specific day
        // 1. Create my data that needs to be added
        var reading = {
            temp: temperature,
            time: Timestamp.now()
        }

        // 2. Call my firebase function
        var success = await addReading(selectedDay, reading) // true or false based on the try/catch

        if (success) {
            navigation.goBack()
        }
    }

    useEffect(() => {
        handleGettingDays()
    }, [])

    const [days, setDays] = useState([]);

    const handleGettingDays = async () => {
        var daysData = await getAllDays();

        setDays(daysData);
        setSelectedDay(daysData[0].id)
    }

    return (
        <View style={styles.container}>

            <Picker
                style={styles.inputField}
                selectedValue={selectedDay}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedDay(itemValue)
                }>

                {/* Update to data from db */}
                {days != [] ? (
                    days.map((day) => (
                        <Picker.Item key={day.id} label={day.name} value={day.id} />
                    ))
                ) : null}
            </Picker>

            <TextInput
                style={styles.inputField}
                placeholder="Temperature"
                onChangeText={newText => setTemp(newText)}
                defaultValue={temperature}
            />

            <TouchableOpacity style={styles.button} onPress={handleCreation} >
                <Text style={styles.buttonText}>Add Reading</Text>
            </TouchableOpacity>

        </View>

    )
}

export default AddScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    inputField: {
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 15,
        padding: 10
    },
    button: {
        backgroundColor: "black",
        textAlign: 'center',
        padding: 15,
        marginTop: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
})