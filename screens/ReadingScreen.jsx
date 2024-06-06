import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReadingCard from './ReadingCard'
import { getAllDays } from '../services/FirestoreServices'

const ReadingScreen = ({ navigation }) => {

  useEffect(() => {
    handleGettingDays()
  }, [])

  const [days, setDays] = useState([]);

  const handleGettingDays = async () => {
    var daysData = await getAllDays();

    setDays(daysData);
  }

  return (
    <View style={styles.container}>
      <Button title='Add Reading' onPress={() => navigation.navigate("Add")} />

      {/* TODO: Get all days and display them here using the reading card (doesnt include the readings data, just the days data) */}
      {days.map((item) => (
        <ReadingCard day={item} key={item.id} />
      ))}

    </View>
  )
}

export default ReadingScreen

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})