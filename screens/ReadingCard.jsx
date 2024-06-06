import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { getReadings } from '../services/FirestoreServices';
import { useFocusEffect } from '@react-navigation/native';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const ReadingCard = (props) => {
  const [arrReadings, setArrReadings] = useState([])

  // TODO: Setup Realtime Listening for the specific day's readings
  const { day } = props;

  // useEffect(() => {
  //   handleGettingReadings()
  // }, [])

  // const handleGettingReadings = async () => {
  //   var arrReadings = await getReadings(day.id);

  //   setArrReadings(arrReadings);
  // }

  // Data is done in this file and not a service file because it has trouble functioning if it is being exported/imported
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('in view')

      // 1. Specify where we want to get the data from
      const collectionRef = doc(db, "days", day.id);

      // 2. Specify what it is that we want to do with this collection (i.e. get the document)
      const readingRef = collection(collectionRef, "readings");

      // onSnapshot = listen to data changes
      // Call unsubscribe when you want to stop listening to the data
      const unsubscribe = onSnapshot(readingRef, (querySnapshot) => {
        const readingData = [];

        querySnapshot.forEach((doc) => {
          readingData.push(doc.data());
          console.log('current readings: ', doc.data())
        });

        setArrReadings(readingData) //<-- updating useState that displays my readings
      });

      return () => {
        console.log('out of view')
        unsubscribe() // <-- stops listening for data changes
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        <Feather name={day.icon} size={28} color="black" />
        {"  " + day.name + "  "}
        <Feather name={day.icon} size={28} color="black" />
      </Text>

      <View style={styles.readingsBlock}>
        {arrReadings != [] ? (
          arrReadings.map((item) => (
            <View style={styles.readingBubble} key={item.time}>
              <Text style={styles.readingText}>{item.temp}</Text>
            </View>
          ))
        ) : (
          <Text>No readings yet</Text>
        )}

      </View>
    </View>
  )
}

export default ReadingCard

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold'
  },
  readingsBlock: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20
  },
  readingBubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  readingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})