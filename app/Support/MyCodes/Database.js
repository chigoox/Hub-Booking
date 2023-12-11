import { arrayRemove, arrayUnion, deleteField, doc, getDoc, setDoc,collection, where, updateDoc, query,orderBy, getDocs, limit, deleteDoc } from "firebase/firestore";
import { DATABASE } from "../../../Firebase";


export async function addToDatabase(collection, Doc, field, data) {
console.log(collection, Doc, field, data)
   if (Doc){
    try {
     await setDoc(doc(DATABASE, collection, Doc), {
        [field]: data,
    }, { merge: true });
   } catch (error) {
    console.log(error.message)
   }
   }

}

export async function addToDoc(collection, Doc,  data) {
console.log(collection, Doc, data)
   if (Doc){
    try {
     await setDoc(doc(DATABASE, collection, Doc), 
         {...data}, { merge: true });
   } catch (error) {
    console.log(error.message)
   }
   }

}

export async function deleteDocument(collection, Doc){
    try {
        await deleteDoc(doc(DATABASE, collection, Doc));
    } catch (error) {
    console.log(error.message)
        
    }

}



export async function updateDatabaseItem(collection, Doc, Field, Value) {
    
    await updateDoc(doc(DATABASE, collection, Doc), {
        [Field]: Value ? Value : deleteField()
    });
}

export async function updateArrayDatabaseItem(collection, Doc, Field, Value, remove) {
console.log 
    if (typeof Value[0] == 'Array') Value = Value[0]
    
    await updateDoc(doc(DATABASE, collection, Doc), {
        [Field]: !remove ? arrayUnion(Value) : arrayRemove(Value)
    });
}

export async function fetchDocument(collection, document, setterfunction) {
    const docRef = doc(DATABASE, collection, document);
   try {
     const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
       if(setterfunction) setterfunction(docSnap.data());
       return docSnap.data()
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
     } catch (error) {
    console.log(error.message)
   }
}
export async function fetchDocument2(collection, document, setterfunction) {
    const docRef = doc(DATABASE,'User', collection, document ? document : '');
   try {
    console.log(docRef)
     const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
       if(setterfunction) setterfunction(docSnap.data());
       return docSnap.data()
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return("No such document!");
    }
     } catch (error) {
    console.log(error.message)
   }
}

 export const FetchThisDocs = async (datacollection, value, opp, key, orderby) => {
        const ref = collection(DATABASE, `${datacollection}`)
        const qry = orderby ? query(ref, where(`${value}`, `${opp}`, `${key}`),orderBy(`${orderby}`, 'desc')) : query(ref, where(`${value}`, `${opp}`, `${key}`)) 
        const snapShot = await getDocs(qry)
        let data = []
        snapShot.forEach((doc) => {
            data = [...data, doc.data()]
        });
        return data
    }

    export const FetchThisDocs2 = async (datacollection, value1, opp1, key1, value2, opp2, key2, orderby) => {
        const ref = collection(DATABASE, `${datacollection}`)
        const qry = orderby ? query(ref, where(`${value1}`, `${opp1}`, `${key1}`), where(`${value2}`, `${opp2}`, `${key2}`),orderBy(`${orderby}`, 'desc')) : query(ref, where(`${value1}`, `${opp1}`, `${key1}`), where(`${value2}`, `${opp2}`, `${key2}`)) 
        const snapShot = await getDocs(qry)
        let data = []
        snapShot.forEach((doc) => {
            data = [...data, doc.data()]
        });
        return data
    }

    export const fetchIncludesArray = async (datacollection, key , array, orderby) => {
        const ref = collection(DATABASE, `${datacollection}`)
        const qry = query(ref, where(key, 'in', array));
        const snapShot = await getDocs(qry)
        let data = []
        snapShot.forEach((doc) => {
            data = [...data, doc.data()]
        });
        return data
 
    }

    export const fetchArrayContains = async (datacollection, key , valueInArray) => {
        const ref = collection(DATABASE, `${datacollection}`)
        const qry = query(ref, where(key, "array-contains", valueInArray)); 
        const snapShot = await getDocs(qry)
        let data = []
        snapShot.forEach((doc) => {
            data = [...data, doc.data()]
        });
        return data
    }



     export const fetchInOrder = async (datacollection, orderby, _limit) => {
        const ref = collection(DATABASE, datacollection)
        const qry = _limit ? query(ref, orderBy(orderby, 'desc'), limit(_limit)) : query(ref, orderBy(orderby, 'desc')) 
        const snapShot = await getDocs(qry)

        let data = []
        snapShot.forEach((doc) => {
             data = [...data, doc.data()]
        });

        return data
        
    }
    