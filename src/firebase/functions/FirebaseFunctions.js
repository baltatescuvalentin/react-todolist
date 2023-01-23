import app, { firestore } from "../firebase";
import { collection, query, where, getDocs, onSnapshot, addDoc, orderBy } from "firebase/firestore";
import { v4 as uuid4 } from 'uuid';
import _ from "lodash";

function compareObjects(a, b) {
    console.log(a);
    console.log(b);
    return _.isEqual(a, b);
}

async function checkIfExistsInUsers(username, email) {
    const q = query(collection(firestore, 'users'), where('username', '==', username), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty)
        return false;
    return true;
}

async function addToUsers(username, email) {
    await addDoc(collection(firestore, 'users'), {
        username: username,
        email: email,
    });
}

async function addToNotes(note, uid) {
    await addDoc(collection(firestore, 'notes'), {
        note: note,
        userUid: uid,
        noteUid: uuid4(),
    })
}

async function addToFolders(folderName, uid) {
    if(await checkIfFolderExists(folderName))
        throw new Error('Folder already exists!');
    return await addDoc(collection(firestore, 'folders'), {
        folderName: folderName,
        userUid: uid,
        folderUid: uuid4(),
    })
}

async function checkIfFolderExists(folderName) {
    const q = query(collection(firestore, 'folders'), where('folderName', '==', folderName));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty)
        return false;
    return true;
}

async function addToTasks(folderName, name, description, date, priority, finished = false, userUid) {
    return await addDoc(collection(firestore, 'tasks'), {
        folderName: folderName,
        taskUid: uuid4(),
        name: name,
        description: description,
        priority: priority,
        finished: finished,
        userUid: userUid,
        date: date,
    })
}

async function getFolders(uid) {
    const q = query(collection(firestore, 'folders'), where('userUid', '==', uid), orderBy('folderName'));
    const querySnapshot = await getDocs(q);
    let folders = [];
    querySnapshot.forEach(q => folders.push(q.data()))
    // const notesMap = querySnapshot.map(q => q.data());
    return folders;
}

async function getNotes(uid) {
    const q = query(collection(firestore, 'notes'), where('userUid', '==', uid));
    const querySnapshot = await getDocs(q);
    let notes = [];
    querySnapshot.forEach(q => notes.push(q.data()))
    // const notesMap = querySnapshot.map(q => q.data());
    return notes;
}

async function findEmailWithUsername(username) {
    const q = query(collection(firestore, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    //console.log(querySnapshot.forEach(e => console.log(e.data().email)));
    //console.log(querySnapshot.docs[0].data().email);
    if(!querySnapshot.empty) {
        const email = querySnapshot.docs[0].data().email;
        return email;
    }
    return false;
}



export {
    checkIfExistsInUsers,
    addToUsers,
    findEmailWithUsername,
    addToNotes,
    getNotes,
    addToFolders,
    getFolders,
    compareObjects,
    addToTasks,
}