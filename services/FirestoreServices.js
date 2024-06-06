import { addDoc, collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export const addReading = async (dayId, readingData) => {

    try {
        // Add reading to specific day
        // 1. Where we want the data to be added
        const dayRef = doc(db, "days", dayId)

        // 2. Specify the subcollection in this document
        const readingRef = collection(dayRef, "readings")

        // 3. Add document into this subcollection that we have
        const docRef = await addDoc(readingRef, readingData)

        console.log("Success adding doc with ID: ", docRef.id)

        return true
    } catch (e) {
        console.log("Something went wrong adding reading document: ", e)

        return false
    }

}

export const getAllDays = async () => {

    try {
        // 1. Specify where we want to get the data from
        const collectionRef = collection(db, "days");

        // Bonus: order by a field in my documents
        const q = query(collectionRef, orderBy("dayOfWeek", "asc"))

        // 2. Specify what it is that we want to do with this collection (i.e. get the document)
        const querySnapshot = await getDocs(q);

        // 3. Process the data to be manageable
        var daysData = []; // <-- What I want to return

        // 4. Loop through each document to add it to the item that you want to return
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());

            // The same as:
            // var theDay = doc.data();
            // theDay.id = doc.id;
            // this combines two lines into one
            var theDay = { ...doc.data(), id: doc.id } // <-- The ID is not a part of thse .data(), which is why we need to include it by using the array

            daysData.push(theDay);
        })

        return (daysData)
    } catch (error) {
        console.log('An error occurred: ', error)
    }

}

export const getReadings = async (dayID) => {
    // 1. Specify where we want to get the data from
    const collectionRef = collection(db, "days", dayID, "readings");

    // 2. Specify what it is that we want to do with this collection (i.e. get the document)
    const querySnapshot = await getDocs(collectionRef);

    // 3. Process the data to be manageable
    var readingsData = []; // <-- What I want to return

    // 4. Loop through each document to add it to the item that you want to return
    querySnapshot.forEach((doc) => {
        var theReading = { ...doc.data(), id: doc.id } // <-- The ID is not a part of thse .data(), which is why we need to include it by using the array

        readingsData.push(theReading);
    })

    return (readingsData)
}